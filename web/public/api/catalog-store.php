<?php
/**
 * The live product catalogue, shared by products.php (anyone, read) and admin.php (signed
 * in, write).
 *
 * The pages are built with data/products.json. Once the client edits the catalogue at
 * /admin/, the edited list is kept here in api/data/products.json and the pages read it
 * through products.php after they load. Before the first save there is no live file and
 * the pages keep what they were built with. scripts/pull-products.mjs copies the live list
 * back into the sources before a build, so the static HTML catches up.
 *
 * Every save first copies the previous list to api/data/history/, so a mistake can be
 * undone from the admin. api/data/ is refused to the web: products.php is the only way in.
 *
 * The families are not edited here: each has its own page and copy in data/catalog.ts. The
 * build writes them to api/catalog.json, and a product must belong to one of them.
 *
 * Written for PHP 5.6 and up, like mailer.php.
 */

ini_set('display_errors', '0');
date_default_timezone_set('Africa/Casablanca');

define('STORE_DIR', __DIR__ . '/data');
define('STORE_FILE', STORE_DIR . '/products.json');
define('HISTORY_DIR', STORE_DIR . '/history');
define('SEED_FILE', __DIR__ . '/catalog.json');
/** Older versions beyond this are deleted on save. */
define('HISTORY_KEEP', 40);

const JSON_FLAGS = 448; // JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT

/** A JSON file as an array, or null when it is missing or unreadable. */
function readJson($file)
{
    if (!is_file($file)) return null;
    $data = json_decode((string)file_get_contents($file), true);
    return is_array($data) ? $data : null;
}

/** The live list: array('version', 'updated', 'products'), or null before the first save. */
function storeRead()
{
    $store = readJson(STORE_FILE);
    return $store !== null && isset($store['products']) && is_array($store['products']) ? $store : null;
}

/** What the build wrote: the families, and the products the pages were built with. */
function seedRead()
{
    return readJson(SEED_FILE);
}

/** The family keys a product may use. */
function categoryKeys()
{
    $seed = seedRead();
    $keys = array();
    if ($seed !== null && isset($seed['categories']) && is_array($seed['categories'])) {
        foreach ($seed['categories'] as $category) {
            if (isset($category['key']) && is_string($category['key'])) $keys[] = $category['key'];
        }
    }
    return $keys;
}

/** One line of text: no control characters, single spaces, trimmed, capped. */
function cleanText($value, $max)
{
    if (!is_string($value)) return '';
    if (!preg_match('//u', $value)) return '';
    $value = preg_replace('/[\x00-\x1F\x7F]+/u', ' ', $value);
    $value = trim(preg_replace('/ {2,}/', ' ', $value));
    if (function_exists('mb_substr')) return mb_substr($value, 0, $max, 'UTF-8');
    return preg_match('/^.{0,' . $max . '}/su', $value, $m) ? $m[0] : substr($value, 0, $max);
}

/** A French / English pair. */
function cleanWords($value, $max)
{
    $value = is_array($value) ? $value : array();
    return array(
        'fr' => cleanText(isset($value['fr']) ? $value['fr'] : '', $max),
        'en' => cleanText(isset($value['en']) ? $value['en'] : '', $max),
    );
}

/**
 * The list the admin sent, checked and reduced to the fields the site reads. Returns
 * array(products, error); error is '' when the list is valid, otherwise a sentence in
 * French for the admin to show.
 */
function validateProducts($raw)
{
    if (!is_array($raw)) return array(null, 'La liste des produits est illisible.');
    if (count($raw) > 2000) return array(null, 'Trop de produits (2000 au plus).');

    $categories = categoryKeys();
    if (!$categories) return array(null, 'api/catalog.json est introuvable : publiez le site complet avant d’utiliser l’administration.');

    $out = array();
    $seen = array();
    foreach (array_values($raw) as $i => $item) {
        $n = $i + 1;
        if (!is_array($item)) return array(null, "Produit n° $n illisible.");
        $id = isset($item['id']) && is_string($item['id']) ? $item['id'] : '';
        if (!preg_match('/^[a-z0-9]+(-[a-z0-9]+)*$/', $id) || strlen($id) > 80) {
            return array(null, "Produit n° $n : identifiant « $id » invalide (lettres minuscules, chiffres et tirets).");
        }
        if (isset($seen[$id])) return array(null, "L’identifiant « $id » est utilisé deux fois.");
        $seen[$id] = true;

        $category = isset($item['category']) && is_string($item['category']) ? $item['category'] : '';
        if (!in_array($category, $categories, true)) return array(null, "« $id » : famille « $category » inconnue.");

        $name = cleanWords(isset($item['name']) ? $item['name'] : null, 120);
        if ($name['fr'] === '') return array(null, "« $id » : le nom en français est obligatoire.");
        $text = cleanWords(isset($item['text']) ? $item['text'] : null, 400);

        $product = array('id' => $id, 'category' => $category);
        $sub = cleanWords(isset($item['sub']) ? $item['sub'] : null, 60);
        if ($sub['fr'] !== '') $product['sub'] = $sub;
        $product['name'] = $name;
        $product['text'] = $text;
        $out[] = $product;
    }
    return array($out, '');
}

/** Creates api/data/ and its history, closed to the web. */
function ensureStoreDir()
{
    foreach (array(STORE_DIR, HISTORY_DIR) as $dir) {
        if (!is_dir($dir) && !@mkdir($dir, 0755, true)) throw new RuntimeException("mkdir $dir");
    }
    $deny = STORE_DIR . '/.htaccess';
    if (!is_file($deny)) @file_put_contents($deny, "Require all denied\n");
}

/** Writes a file whole or not at all: to a temporary name first, then renamed over. */
function writeAtomic($file, $content)
{
    $tmp = $file . '.' . getmypid() . '.tmp';
    if (@file_put_contents($tmp, $content) === false) throw new RuntimeException("write $tmp");
    if (!@rename($tmp, $file)) {
        // Windows hosts refuse to rename over an existing file.
        @unlink($file);
        if (!@rename($tmp, $file)) throw new RuntimeException("rename $tmp");
    }
}

/**
 * Saves a validated list and returns the new store. The caller holds the lock. The list
 * being replaced — the live one, or the build's before the first save — goes to history.
 */
function storeWrite(array $products, $previous)
{
    ensureStoreDir();
    if ($previous !== null) {
        $stamp = date('Ymd-His');
        writeAtomic(HISTORY_DIR . "/products-$stamp.json", json_encode($previous, JSON_FLAGS));
        $old = glob(HISTORY_DIR . '/products-*.json');
        if ($old && count($old) > HISTORY_KEEP) {
            sort($old);
            foreach (array_slice($old, 0, count($old) - HISTORY_KEEP) as $file) @unlink($file);
        }
    }
    $store = array(
        'version' => bin2hex(function_exists('random_bytes') ? random_bytes(8) : openssl_random_pseudo_bytes(8)),
        'updated' => date('c'),
        'products' => $products,
    );
    writeAtomic(STORE_FILE, json_encode($store, JSON_FLAGS));
    return $store;
}

/** Holds an exclusive lock on the store for the rest of the request. */
function lockStore()
{
    ensureStoreDir();
    $handle = fopen(STORE_DIR . '/.lock', 'c');
    if (!$handle || !flock($handle, LOCK_EX)) throw new RuntimeException('lock');
    return $handle;
}

/** The saved versions, newest first: array(file, date, count). */
function historyList()
{
    $files = glob(HISTORY_DIR . '/products-*.json');
    if (!$files) return array();
    rsort($files);
    $out = array();
    foreach ($files as $file) {
        $data = readJson($file);
        $out[] = array(
            'file' => basename($file),
            'date' => isset($data['updated']) ? $data['updated'] : date('c', filemtime($file)),
            'count' => isset($data['products']) && is_array($data['products']) ? count($data['products']) : 0,
        );
    }
    return $out;
}

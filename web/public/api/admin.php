<?php
/**
 * The catalogue admin's server side, for public/admin/index.html. One password, set in
 * admin-config.php (see admin-config.example.php), opens a session; the session then
 * reads and saves the product list kept by catalog-store.php.
 *
 *   GET  ?action=state            signed in or not, and the CSRF token when signed in
 *   POST {action: login, password}
 *   POST {action: logout}
 *   GET  ?action=load             the list to edit: live, or the build's before the first save
 *   POST {action: save, products, version}
 *   GET  ?action=history          the saved versions
 *   POST {action: restore, file}  puts an earlier version back
 *
 * Every POST carries the session's CSRF token in X-CSRF-Token (except login) and must come
 * from the site itself. Five wrong passwords in an hour lock the address out for the hour.
 * A save names the version it started from: if someone saved in between, it is refused
 * rather than silently overwriting their work.
 */

require __DIR__ . '/mailer.php';
require __DIR__ . '/catalog-store.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex');

/** Answers with a JSON body and stops. */
function answer($status, array $body)
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function fail($status, $error, $message = '')
{
    answer($status, array('success' => false, 'error' => $error, 'message' => $message));
}

/** admin-config.php, or null when it is missing or still holds the example password. */
function adminConfig()
{
    $file = __DIR__ . '/admin-config.php';
    if (!is_file($file)) return null;
    $config = require $file;
    if (!is_array($config)) return null;
    $hash = isset($config['password_hash']) ? (string)$config['password_hash'] : '';
    $plain = isset($config['password']) ? (string)$config['password'] : '';
    if ($hash !== '') return array('hash' => $hash);
    if ($plain === 'CHANGE-ME' || strlen($plain) < 12) return null;
    return array('plain' => $plain);
}

function passwordMatches(array $config, $given)
{
    if (isset($config['hash'])) return password_verify($given, $config['hash']);
    return hash_equals($config['plain'], $given);
}

/* ------------------------------------------------------------------ session */

/** Eight hours, then the admin signs in again. */
define('SESSION_TTL', 8 * 3600);

function startSession()
{
    $secure = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
    session_name('aliom_admin');
    if (PHP_VERSION_ID >= 70300) {
        session_set_cookie_params(array('lifetime' => 0, 'path' => '/', 'secure' => $secure, 'httponly' => true, 'samesite' => 'Strict'));
    } else {
        // Before 7.3 the SameSite attribute can only ride along in the path.
        session_set_cookie_params(0, '/; samesite=Strict', '', $secure, true);
    }
    session_start();
    if (!empty($_SESSION['admin']) && time() - (int)$_SESSION['at'] > SESSION_TTL) {
        $_SESSION = array();
        session_regenerate_id(true);
    }
}

function signedIn()
{
    return !empty($_SESSION['admin']);
}

function requireSignedIn()
{
    if (!signedIn()) fail(401, 'signin', 'Session expirée : reconnectez-vous.');
}

/** A POST from the admin page itself, with the session's token. */
function requireToken()
{
    $given = isset($_SERVER['HTTP_X_CSRF_TOKEN']) ? (string)$_SERVER['HTTP_X_CSRF_TOKEN'] : '';
    if (empty($_SESSION['csrf']) || !hash_equals($_SESSION['csrf'], $given)) fail(403, 'token', 'Session invalide : rechargez la page.');
}

/* ------------------------------------------------------------------- the request */

$method = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : 'GET';
$body = array();
if ($method === 'POST') {
    // Only the site's own pages post here.
    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
    if ($origin !== '' && !preg_match('#^https://(www\.)?aliomtrading\.com$#', $origin)) fail(403, 'origin');
    $body = json_decode((string)file_get_contents('php://input'), true);
    if (!is_array($body)) fail(400, 'body');
    $action = isset($body['action']) ? (string)$body['action'] : '';
} elseif ($method === 'GET') {
    $action = isset($_GET['action']) ? (string)$_GET['action'] : '';
} else {
    fail(405, 'method');
}

$config = adminConfig();
if ($config === null) {
    fail(500, 'config', 'L’administration n’est pas configurée : créez api/admin-config.php sur le serveur (voir admin-config.example.php).');
}

startSession();

switch ($method . ' ' . $action) {
    case 'GET state':
        answer(200, array('success' => true, 'signedIn' => signedIn(), 'csrf' => signedIn() ? $_SESSION['csrf'] : null));

    case 'POST login':
        if (count(recentSends('admin-login')) >= 5) fail(429, 'rate', 'Trop de tentatives : réessayez dans une heure.');
        $given = isset($body['password']) ? (string)$body['password'] : '';
        if (!passwordMatches($config, $given)) {
            recordSend('admin-login');
            // Slows a script down without bothering a person.
            sleep(1);
            fail(401, 'password', 'Mot de passe incorrect.');
        }
        session_regenerate_id(true);
        $_SESSION['admin'] = true;
        $_SESSION['at'] = time();
        $_SESSION['csrf'] = randomHex(32);
        answer(200, array('success' => true, 'signedIn' => true, 'csrf' => $_SESSION['csrf']));

    case 'POST logout':
        requireToken();
        $_SESSION = array();
        session_destroy();
        answer(200, array('success' => true));

    case 'GET load':
        requireSignedIn();
        $store = storeRead();
        if ($store !== null) {
            answer(200, array('success' => true, 'source' => 'live', 'version' => $store['version'], 'updated' => $store['updated'], 'products' => $store['products']));
        }
        $seed = seedRead();
        answer(200, array('success' => true, 'source' => 'build', 'version' => 'build', 'updated' => null, 'products' => $seed !== null && isset($seed['products']) ? $seed['products'] : array()));

    case 'POST save':
        requireSignedIn();
        requireToken();
        list($products, $error) = validateProducts(isset($body['products']) ? $body['products'] : null);
        if ($error !== '') fail(400, 'invalid', $error);
        try {
            $lock = lockStore();
            $current = storeRead();
            $currentVersion = $current !== null ? $current['version'] : 'build';
            $base = isset($body['version']) ? (string)$body['version'] : '';
            if ($base !== $currentVersion) {
                fail(409, 'conflict', 'Le catalogue a été modifié ailleurs depuis votre chargement. Rechargez la page avant d’enregistrer.');
            }
            if ($current === null) {
                $seed = seedRead();
                $current = array('version' => 'build', 'updated' => null, 'products' => $seed !== null && isset($seed['products']) ? $seed['products'] : array());
            }
            $store = storeWrite($products, $current);
            flock($lock, LOCK_UN);
        } catch (Exception $e) {
            error_log('admin.php save: ' . $e->getMessage());
            fail(500, 'write', 'Enregistrement impossible : le serveur refuse d’écrire dans api/data/.');
        }
        answer(200, array('success' => true, 'version' => $store['version'], 'updated' => $store['updated'], 'count' => count($products)));

    case 'GET history':
        requireSignedIn();
        answer(200, array('success' => true, 'versions' => historyList()));

    case 'POST restore':
        requireSignedIn();
        requireToken();
        $file = isset($body['file']) ? basename((string)$body['file']) : '';
        if (!preg_match('/^products-\d{8}-\d{6}\.json$/', $file)) fail(400, 'file');
        $old = readJson(HISTORY_DIR . '/' . $file);
        if ($old === null || !isset($old['products'])) fail(404, 'file', 'Version introuvable.');
        list($products, $error) = validateProducts($old['products']);
        if ($error !== '') fail(400, 'invalid', $error);
        try {
            $lock = lockStore();
            $current = storeRead();
            $store = storeWrite($products, $current);
            flock($lock, LOCK_UN);
        } catch (Exception $e) {
            error_log('admin.php restore: ' . $e->getMessage());
            fail(500, 'write', 'Restauration impossible : le serveur refuse d’écrire dans api/data/.');
        }
        answer(200, array('success' => true, 'version' => $store['version'], 'updated' => $store['updated'], 'products' => $store['products']));

    default:
        fail(400, 'action');
}

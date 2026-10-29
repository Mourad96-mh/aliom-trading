<?php
/**
 * The live product list, as the admin last saved it, for components/Catalog/liveProducts.ts.
 * `products` is null until the first save: the pages then keep the list they were built
 * with. See catalog-store.php.
 */

require __DIR__ . '/catalog-store.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex');

$store = storeRead();
echo json_encode(
    array(
        'updated' => $store !== null && isset($store['updated']) ? $store['updated'] : null,
        'products' => $store !== null ? $store['products'] : null,
    ),
    JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
);

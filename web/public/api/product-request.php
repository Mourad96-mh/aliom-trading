<?php
/**
 * The product-request form's mailer: a product that is not in the catalogue yet, posted by
 * components/forms/ProductRequestForm.tsx. The sending itself is in mailer.php.
 */

require __DIR__ . '/mailer.php';

$smtp = startForm();

$fields = [
    'Direction' => field('sens'),
    'Product' => field('produit'),
    'First name' => field('prenom'),
    'Last name' => field('nom'),
    'Company' => field('societe'),
    'Email' => field('email'),
    'Country' => field('pays'),
];
requireFields($fields, $fields['Email']);
$fields['Estimated quantity'] = field('quantite');
$fields['Delivery country'] = field('destination');
$fields['Phone'] = field('telephone', 40);
$fields['Site language'] = field('langue', 5);
$details = multiline('details');

checkRate('product-request');

$name = $fields['First name'] . ' ' . $fields['Last name'];
sendAndReply(
    $smtp,
    'product-request',
    'aliomtrading.com – Product request – ' . $fields['Product'] . " – $name",
    $name,
    $fields['Email'],
    htmlBody('New request for a product not in the catalogue, received through aliomtrading.com.', $fields, $details)
);

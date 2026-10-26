<?php
/**
 * Copy to mail-config.php ON THE SERVER and fill in. mail-config.php is git-ignored and
 * refused to the web by .htaccess. Port 465 = implicit TLS (see smtpSend in mailer.php).
 */
return array(
    'host' => 'smtp.strato.com',
    'port' => 465,
    'user' => 'info@aliomtrading.com',
    'password' => 'CHANGE-ME',
    'from' => 'info@aliomtrading.com',
    'to' => 'info@aliomtrading.com',
);

<?php
/**
 * Copy to admin-config.php ON THE SERVER and fill in. admin-config.php is git-ignored and
 * refused to the web by .htaccess.
 *
 * The admin password: at least 12 characters. Either write it as is in 'password', or,
 * better, put its hash in 'password_hash' and leave 'password' empty. To get a hash, run
 *     php -r "echo password_hash('your password', PASSWORD_DEFAULT), PHP_EOL;"
 */
return array(
    'password' => 'CHANGE-ME',
    'password_hash' => '',
);

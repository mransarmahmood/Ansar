<?php
require_once __DIR__ . '/includes/auth.php';
do_logout();
header('Location: login.php?logged_out=1');
exit;

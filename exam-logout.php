<?php
require_once __DIR__ . '/exams-config.php';
unset($_SESSION['sub_id'], $_SESSION['sub_name']);
header('Location: ' . EXAM_BASE . 'exam-login.php');
exit;

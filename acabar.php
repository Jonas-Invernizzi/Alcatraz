<?php
session_start();

$_SESSION['status'] = false;
unset($_SESSION['tabela']);
die (json_encode($_SESSION['status']));
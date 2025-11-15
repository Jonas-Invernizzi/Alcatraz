<?php
session_start();
if (!(isset($_SESSION['jogada']))){
    $_SESSION['jogada'] = false;
}
if (isset($_SESSION['status']) && $_SESSION['status']) {
    die(json_encode([
    "status" => $_SESSION['status'],
    "jogada" => $_SESSION['jogada']
]));
} else {
    die(json_encode([
    "status" => false,
    "jogada" => $_SESSION['jogada']
    ]));}
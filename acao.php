<?php
session_start();
if (isset($_POST['tabuleiro'])) {
    $_SESSION['tabela'] = json_decode($_POST['tabuleiro']);
}
$_SESSION['um']++;
if($_SESSION['jogada']){
    $_SESSION['jogada'] = false;
}
else{
    $_SESSION['jogada'] = true;
}

die(json_encode(
    [
        "tabuleiro" => $_SESSION['tabela'],
        "jogada" => $_SESSION['jogada'],
    ]
));
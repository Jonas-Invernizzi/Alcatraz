<?php
session_start();
$_SESSION['player1'] = true;
$_SESSION['player2'] = true;
$_SESSION['um'] = 0;
$_SESSION['status'] = true;
if(!(isset($_SESSION['p1']))){
    $_SESSION['p1'] = 'https://tiermaker.com/images/media/template_images/2024/18003943/italian-brainrot-animals-18003943/images-22.png';
}
if(!(isset($_SESSION['p2']))){
    $_SESSION['p2'] = 'https://tiermaker.com/images/media/template_images/2024/18003943/italian-brainrot-animals-18003943/images-27.png';
}
die (json_encode($_SESSION['status']));



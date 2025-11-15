<?php
session_start();
if(isset($_SESSION['tabela'])){
    if(!(isset($_SESSION['um']))){
        $_SESSION['um'] = 0;
    }
    else if($_SESSION['um']>=1){
       $_SESSION['player1'] = false;
        $_SESSION['player2'] = true;
    }
    else if($_SESSION['um']>=2){
        $_SESSION['player1'] = false;
        $_SESSION['player2'] = false;
    }
    $_SESSION['player1'] = true;
    $_SESSION['player2'] = true;
    die(json_encode([
        "tabela" => $_SESSION['tabela'],
        "player1" =>  $_SESSION['player1'],
        "player2" =>  $_SESSION['player2'],
    ]));
    
}
$_SESSION['tabela'] = [
    [0,0,0,0,3,0,0,0,0],
    [0,0,0,3,0,0,0,0,0],
    [0,0,0,0,0,3,0,0,0],
    [0,0,3,0,0,0,0,0,0],
    [0,0,0,0,0,0,3,0,0],
    [0,3,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,3,0],
    [3,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
];

die(json_encode([
    "tabela" => $_SESSION['tabela'],
    "player1" =>  $_SESSION['player1'],
    "player2" =>  $_SESSION['player2'],
]));

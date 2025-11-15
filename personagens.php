<?php

session_start();
if(isset($_POST['p1'])){
    $_SESSION['p1'] = $_POST['p1'];
}
else if(!(isset($_SESSION['p1']))){
    $_SESSION['p1'] = 'https://tiermaker.com/images/media/template_images/2024/18003943/italian-brainrot-animals-18003943/images-22.png';
}
if(isset($_POST['p2'])){
    $_SESSION['p2'] = $_POST['p2'];
}
else if(!(isset($_SESSION['p2']))){
    $_SESSION['p2'] = 'https://tiermaker.com/images/media/template_images/2024/18003943/italian-brainrot-animals-18003943/images-27.png';
}


$personagem = [
    "https://tiermaker.com/images/media/template_images/2024/18003943/italian-brainrot-animals-18003943/images-22.png",
    "https://tiermaker.com/images/media/template_images/2024/18110685/all-italian-brainrot-18110685/images-1.png",
    "https://tiermaker.com/images/media/template_images/2024/18003943/italian-brainrot-animals-18003943/e16119a4ab4b4adca255d70e4f0fcb11h3000w3000464464.png",
    "https://tiermaker.com/images/media/template_images/2024/18003943/italian-brainrot-animals-18003943/images-33.png",
    "https://tiermaker.com/images/media/template_images/2024/18003943/italian-brainrot-animals-18003943/images-27.png",
    "https://tiermaker.com/images/media/template_images/2024/18003943/italian-brainrot-animals-18003943/images-25.png",
    "https://tiermaker.com/images/media/template_images/2024/18003943/italian-brainrot-animals-18003943/images-24.png",
    "https://tiermaker.com/images/media/template_images/2024/18003943/italian-brainrot-animals-18003943/images-23.png",
    "https://tiermaker.com/images/media/template_images/2024/18003943/italian-brainrot-animals-18003943/download-15.png",
];

die(json_encode(
    [
        "personagens" => $personagem,
        "p1" => $_SESSION['p1'],
        "p2" => $_SESSION['p2'],
    ]
));

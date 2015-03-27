<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <?php include("include/head.php"); ?>
    </head>
    <body class="desktop ou mobile?" onload="$('.loader').removeClass('loading');">
        <?php include("include/loader.php"); ?>
        <div class="carrossel-wrapper carrossel-fundo">
            <div class="carrossel">
                <img class="item" src="assets/img/bg/home-1.jpg" alt="">
                <img class="item" src="assets/img/bg/home-2.jpg" alt="">
                <img class="item" src="assets/img/bg/home-3.jpg" alt="">
            </div>
        </div>
        <div id="wrapper">
            <?php include("include/header.php"); ?>
            <div id="content">
            </div>
        </div>
        <?php include("include/footer.php"); ?>        
        <?php include("include/scripts.php"); ?>
    </body>
</html>

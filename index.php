<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <?php include("_include/head.php"); ?>
    </head>
    <body class="desktop ou mobile?" onload="$('.loader').removeClass('loading');">
        <div class="loader loading"></div>
        <!--[if lte IE 9]><p class="chromeframe">Você está usando um navegador desatualizado. <a href="http://browsehappy.com/">Atualize seu navegador</a> ou <a href="http://www.google.com/chromeframe/?redirect=true">instale o Google Chrome</a> para melhor experiência com este site.</p> <![endif]-->
        <div id="wrapper">
            <?php include("_include/header.php"); ?>
            <div id="content">
            </div>
        </div>
        <?php include("_include/footer.php"); ?>        
        <?php include("_include/scripts.php"); ?>
    </body>
</html>

<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <?php include("_include/head.php"); ?>
    </head>
    <body class="desktop ou mobile?" onload="$('.loader').removeClass('loading');">
        <?php include("_include/loader.php"); ?>
        <div id="wrapper">
            <?php include("_include/header.php"); ?>
            <div id="content">
            </div>
        </div>
        <?php include("_include/footer.php"); ?>        
        <?php include("_include/scripts.php"); ?>
    </body>
</html>

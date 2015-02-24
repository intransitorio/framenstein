<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <?php include("include/head.php"); ?>
    </head>
    <body class="desktop ou mobile?" onload="$('.loader').removeClass('loading');">
        <?php include("include/loader.php"); ?>
        <div id="wrapper">
            <?php include("include/header.php"); ?>
            <div id="content">
            </div>
        </div>
        <?php include("include/footer.php"); ?>        
        <?php include("include/scripts.php"); ?>
    </body>
</html>

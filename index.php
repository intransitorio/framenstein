<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html lang="pt-br"> <!--<![endif]-->
    <head>
        <?php include("_include/head.php"); ?>
    <body onload="$('.loader').removeClass('loading');">
        <div class="loader loading"></div>
        <!--[if lte IE 9]><p class="chromeframe">Você está usando um navegador desatualizado. <a href="http://browsehappy.com/">Atualize seu navegador</a> ou <a href="http://www.google.com/chromeframe/?redirect=true">instale o Google Chrome</a> para melhor experiência com este site.</p> <![endif]-->
        <div id="wrapper">
            <?php include("_include/header.php"); ?>
            <div id="content">
                <h1>Este é o h1</h1>
                <h2>Este é o h2</h2>
                <h3>Este é o h3</h3>
                <h4>Este é o h4</h4>
                <h5>Este é o h5</h5>
                <h6>Este é o h6</h6>
                <ul>
                    <li>Lista item 1</li>
                    <li>Lista item 2</li>
                    <li>Lista item 3</li>
                </ul>
                <p>Este é um paragrafo Lorem ipsum dolor sit amet, consectetur adipisicing elit. In magnam debitis explicabo, quas. Autem, odio, quis. Optio culpa quibusdam perspiciatis officia veniam dicta vitae vero in ea, odit fugiat hic! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt nisi dignissimos autem nam. Sed fuga perspiciatis, quaerat repellat maxime, magnam maiores eius omnis veniam unde temporibus. Recusandae, obcaecati animi aliquid.</p>
                <form action="">
                    <label for="">Este é o label</label>
                    <input type="text">
                    <input type="password">
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                    <input type="submit">
                    <input type="buttom">
                </form>
                <img src="_assets/img/loader-test.png" height="2000" width="2000" alt="">

            </div>
        </div>
        <?php include("_include/footer.php"); ?>
        
        <?php include("_include/scripts.php"); ?>

    </body>
</html>

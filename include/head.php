<?php include('application/.env'); ?>
<?php include('application/include/helpers.php'); ?>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, user-scalable=no" />
<title>Framenstein Framework</title>
<meta name="description" content="">

<!-- Facebook Open Graphs -->
<meta property="og:url" content="Sua URL"/>
<meta property="og:title" content="Título do Site"/>
<meta property="og:description" content="Descrição"/>
<meta property="og:image" content="Link da imagem 200x200"/>
<meta property="og:type" content="website"/>

<link rel="shortcut icon" type="image/x-icon" href="<?= url('favicon.ico') ?>" />

<link rel="stylesheet" href="<?= url_rev('css/all.css') ?>">

<script src="<?= url_rev('js/head.js') ?>"></script>
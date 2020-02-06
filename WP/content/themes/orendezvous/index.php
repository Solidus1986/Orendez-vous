<!DOCTYPE html>
<html lang="<?php bloginfo('language'); ?>">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <title>Admin Wordpress</title>
    <?php wp_head(); ?>
</head>
<body>
    <h1 class="jumbotron text-center">Bienvenue sur la partie Wordpress de o'Rendez-vous</h1>
    <div class="container d-flex flex-column align-items-center">
        <a class="btn btn-primary list-group-item-primary mb-2 w-25" href="<?= FRONT_URL ?>">Retour vers la partie client</a>
        <?php if(is_user_logged_in()) :?>
        <a class="btn btn-primary list-group-item-primary mb-2 w-25" href="admin">Accès à l'administration</a>
        <a class="btn btn-danger list-group-item-danger mb-2 w-25" href="wp/wp-login.php?action=logout">Déconnexion</a>
        <?php else : ?>
        <a class="btn btn-success list-group-item-success mb-2 w-25" href="admin">Connexion</a>
        <?php endif; ?>
    </div>
    <?php wp_footer(); ?>
</body>
</html>


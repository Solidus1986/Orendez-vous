<!DOCTYPE html>
<html lang="<?php bloginfo('language'); ?>">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Admin Wordpress</title>
    <?php wp_head(); ?>
</head>
<body>
    <h1>Bienvenue sur la partie Wordpress de o'Rendez-vous</h1>

    <a href="<?= FRONT_URL ?>">Retour vers la partie client</a>
    <?php if(is_user_logged_in()) :?>
    <a href="admin">Accès à l'administration</a>
    <a href="wp/wp-login.php?action=logout">Déconnexion</a>
    <?php else : ?>
    <a href="admin">Connexion</a>
    <?php endif; ?>
    <?php wp_footer(); ?>
</body>
</html>


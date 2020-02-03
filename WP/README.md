# Installation de WordPress avec Composer
1. Renommer le dossier cloné
2. Supprimer le `.git` avec `sudo rm -R .git`
3. Télécharger WordPress, ses plugins, ses thèmes avec la commande `composer install`
4. Créer la base de données
5. Compléter dans le fichier `wp-config.php` (copie de `wp-config-sample.php`):
   1. Les informations de connexion à la base de données
   2. Les clés de salage
   3. L'URL de la partie front du site
   4. L'URL de la page d'accueil
   5. Passer la constante `WP_DEBUG` à `true`
   6. Sélectionner l'environnement souhaité (`production`, `development` ou `staging`)
   7. La clé de salage pour JWT (ligne 172)
6. Modifier les droits des dossiers et fichiers avec les commandes
    ```
    sudo chown -R <user>:www-data .
    sudo find . -type f -exec chmod 664 {} +
    sudo find . -type d -exec chmod 775 {} +
    sudo chmod 644 .htaccess
    ```
7. Installer WordPress :tada:

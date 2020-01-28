<?php


// vérifie que la fonction orendezvous_enqueue n'a pas déjà été déclarée (dans le cas d'un child thème par exemple)
if (!function_exists('orendezvous_enqueue')) {

    function orendezvous_enqueue() {

        wp_enqueue_style(
            'admin-style',
            plugins_url('/orendez-vous/assets/css/style.css')
        );
    }
}

add_action('admin_enqueue_scripts', 'orendezvous_enqueue');
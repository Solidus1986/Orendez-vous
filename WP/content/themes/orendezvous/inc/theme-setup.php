<?php

if (!function_exists('orendezvous_setup')) {

    function orendezvous_setup() {

        add_theme_support('post-thumbnails');
    }
}

add_action('after_setup_theme', 'orendezvous_setup');

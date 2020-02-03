<?php

function orendezvous_add_dashboard_widgets()
{
    wp_add_dashboard_widget(
        'orendezvous_dashboard_widget_pub', // Nom de mon widget
        'O\'Rendez-Vous', // Titre de l'element
        'orendezvous_dashboard_widget_function' // Fonction en callback
    );
}

function orendezvous_dashboard_widget_function()
{
    ?>
    <h3>Pour contacter le responsable informatique :</h3>
    <p>Par téléphone : <a href="tel:0666666666">06.66.66.66.66</a> (499,99€/min)</p>
    <p>Par mail : <a href="mailto:informatique@orendezvous.local">informatique@orendezvous.local</a></p>
    <?php
}

add_action('wp_dashboard_setup', 'orendezvous_add_dashboard_widgets');

function remove_dashboard_meta() {
    remove_meta_box( 'dashboard_incoming_links', 'dashboard', 'normal' );
    remove_meta_box( 'dashboard_primary', 'dashboard', 'side' );
    remove_meta_box( 'dashboard_secondary', 'dashboard', 'normal' );
    remove_meta_box( 'dashboard_quick_press', 'dashboard', 'side' );
    remove_meta_box( 'dashboard_recent_drafts', 'dashboard', 'side' );
    remove_meta_box( 'dashboard_recent_comments', 'dashboard', 'normal' );
    remove_meta_box( 'dashboard_right_now', 'dashboard', 'normal' );
    remove_meta_box( 'dashboard_activity', 'dashboard', 'normal');
}

add_action('wp_dashboard_setup', 'remove_dashboard_meta');

remove_action('welcome_panel', 'wp_welcome_panel');
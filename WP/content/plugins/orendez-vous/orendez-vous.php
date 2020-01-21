<?php
/*
Plugin Name: oRendez-vous
Description: Mise en place de fonctionnalites pour notre site oRendez-vous
Author: Wave <3
Version: 1.0
*/

if (!defined('WPINC')) {
    die;
}

require plugin_dir_path(__FILE__) . 'inc/osteo_cpt.php';
require plugin_dir_path(__FILE__) . 'inc/pilates_cpt.php';

// CPT OSTEO + TAXOS
$osteo_cpt = new Osteo_cpt;
register_activation_hook(__FILE__, [$osteo_cpt, 'activation']);
register_deactivation_hook(__FILE__, [$osteo_cpt, 'deactivation']);

// CPT PILATES + TAXO
$pilates_cpt = new Pilates_cpt;
register_activation_hook(__FILE__, [$pilates_cpt, 'activation']);
register_deactivation_hook(__FILE__, [$pilates_cpt, 'deactivation']);


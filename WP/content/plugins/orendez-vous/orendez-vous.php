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
require plugin_dir_path(__FILE__) . 'inc/info_cpt.php';
require plugin_dir_path(__FILE__) . 'inc/rest_api.php';
require plugin_dir_path(__FILE__) . 'inc/role.php';


// CPT OSTEO + TAXOS
$osteo_cpt = new Osteo_cpt;
register_activation_hook(__FILE__, [$osteo_cpt, 'activation']);
register_deactivation_hook(__FILE__, [$osteo_cpt, 'deactivation']);

// CPT PILATES + TAXO
$pilates_cpt = new Pilates_cpt;
register_activation_hook(__FILE__, [$pilates_cpt, 'activation']);
register_deactivation_hook(__FILE__, [$pilates_cpt, 'deactivation']);

// CPT INFOS PRATIQUES + TAXO
$info_cpt = new Info_cpt;
register_activation_hook(__FILE__, [$info_cpt, 'activation']);
register_deactivation_hook(__FILE__, [$info_cpt, 'deactivation']);

// Rôles
$ordv_role = new ORdvRole;
register_activation_hook(__FILE__, [$ordv_role, 'activation']);
register_deactivation_hook(__FILE__, [$ordv_role, 'deactivation']);


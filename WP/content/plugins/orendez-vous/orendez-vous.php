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
include_once(ABSPATH . 'wp-includes/pluggable.php');
require plugin_dir_path(__FILE__) . 'inc/osteo_cpt.php';
require plugin_dir_path(__FILE__) . 'inc/pilates_cpt.php';
require plugin_dir_path(__FILE__) . 'inc/info_custom_field.php';
require plugin_dir_path(__FILE__) . 'inc/rest_api.php';
require plugin_dir_path(__FILE__) . 'inc/role.php';
require plugin_dir_path(__FILE__) . 'inc/custom_table.php';
require plugin_dir_path(__FILE__) . 'inc/appointment.php';


// CPT OSTEO + TAXOS
$osteo_cpt = new Osteo_cpt;
register_activation_hook(__FILE__, [$osteo_cpt, 'activation']);
register_deactivation_hook(__FILE__, [$osteo_cpt, 'deactivation']);

// CPT PILATES + TAXO
$pilates_cpt = new Pilates_cpt;
register_activation_hook(__FILE__, [$pilates_cpt, 'activation']);
register_deactivation_hook(__FILE__, [$pilates_cpt, 'deactivation']);

// Custom Fields Infos Pratiques
$info_custom_fields = new Info_custom_field;
register_activation_hook(__FILE__, [$info_custom_fields, 'activation']);
register_deactivation_hook(__FILE__, [$info_custom_fields, 'deactivation']);

// Rôles
$ordv_role = new ORdvRole;
register_activation_hook(__FILE__, [$ordv_role, 'activation']);
register_deactivation_hook(__FILE__, [$ordv_role, 'deactivation']);

// Custom Table
$custom_table = new CustomTable;

// Appointment
$appointment = new Appointment;
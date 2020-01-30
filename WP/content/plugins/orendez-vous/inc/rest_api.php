<?php

require plugin_dir_path(__FILE__) . 'rest_api/thumbnail_field.php';
require plugin_dir_path(__FILE__) . 'rest_api/register_user.php';
require plugin_dir_path(__FILE__) . 'rest_api/meta_users.php';
require plugin_dir_path(__FILE__) . 'rest_api/appointment.php';

$thumbnail_field = new ThumbnailField;
$register_user = new RegisterUser;
$meta_users = new MetaUsers;
$appointment_rest = new AppointmentRest;

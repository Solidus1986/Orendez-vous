<?php

require plugin_dir_path(__FILE__) . 'rest_api/meta_fields.php';
require plugin_dir_path(__FILE__) . 'rest_api/thumbnail_field.php';
require plugin_dir_path(__FILE__) . 'rest_api/register_user.php';
require plugin_dir_path(__FILE__) . 'rest_api/meta_users.php';

$meta_field = new MetaFields;
$thumbnail_field = new ThumbnailField;
$register_user = new RegisterUser;
$meta_users = new MetaUsers;

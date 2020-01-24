<?php

class CustomTable 

{
    public function __construct()
    {
        $this->create_table_appointment();
        $this->create_table_booking();
    }

    public function create_table_appointment()
    {
        global $wpdb;

        $charset_collate = $wpdb->get_charset_collate();

        $appointment_table_name = $wpdb->prefix . 'appointment';

        $appointment_sql = "CREATE TABLE IF NOT EXISTS $appointment_table_name (
            id INT NOT NULL AUTO_INCREMENT,
            type VARCHAR(255) NOT NULL,
            start_date DATETIME NOT NULL,
            end_date DATETIME NOT NULL,
            max_places TINYINT NOT NULL,
            available_places TINYINT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
            updated_at DATETIME NULL,
            PRIMARY KEY (id)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

        dbDelta($appointment_sql);
    }

    public function create_table_booking()
    {
        global $wpdb;

        $charset_collate = $wpdb->get_charset_collate();

        $booking_table_name = $wpdb->prefix . 'booking';

        $booking_sql = "CREATE TABLE IF NOT EXISTS $booking_table_name (
            a_id INT NOT NULL,
            user_id BIGINT(20) UNSIGNED NOT NULL,
            booking_date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
            PRIMARY KEY (a_id, user_id),
            CONSTRAINT `booking_appointment` FOREIGN KEY (`a_id`) REFERENCES `wp_appointment`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
            CONSTRAINT`booking_users` FOREIGN KEY (`user_id`) REFERENCES `wp_users`(`ID`) ON DELETE CASCADE ON UPDATE RESTRICT
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

        dbDelta($booking_sql);
    }
}
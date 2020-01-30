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
            user_id BIGINT(20) UNSIGNED NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
            updated_at DATETIME NULL,
            PRIMARY KEY (id),
            CONSTRAINT`appointment_users` FOREIGN KEY (`user_id`) REFERENCES `wp_users`(`ID`) ON DELETE CASCADE ON UPDATE RESTRICT
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

    public static function add_appointment($args)
    {
        global $wpdb;

        $wpdb->query(
            $wpdb->prepare(
                "INSERT INTO wp_appointment (type, start_date, end_date, max_places, available_places, user_id) VALUES (%s, %s, %s, %d, %d, %d)",
                $args
            )
        );
    }

    public static function read_appointment($user_id)
    {
        global $wpdb;

        return $wpdb->get_results(
            "SELECT * FROM wp_appointment WHERE user_id = $user_id AND start_date > CURRENT_DATE ORDER BY start_date ASC"
        );
    }

    public static function read_available_appointments($user_id, $type)
    {
        global $wpdb;

        return $wpdb->get_results(
            $wpdb->prepare(
                "SELECT * FROM wp_appointment WHERE user_id = %d AND type = '%s' AND available_places <> 0 AND start_date > CURRENT_DATE ORDER BY start_date ASC",
                [
                    $user_id,
                    $type
                ]
            )
        );
    }

    public static function book_appointment($appointment_id, $user_id)
    {
        global $wpdb;
        // pour masquer les erreurs SQL
        $wpdb->hide_errors();
        
        $result = $wpdb->query(
            $wpdb->prepare(
                "INSERT INTO wp_booking (a_id, user_id) VALUES (%d, %d);",
                [
                    $appointment_id,
                    $user_id
                ]
            )
        );

        // $result est false si on a déjà un rdv
        // dans ce cas, on quitte la méthode en retournant $result qui est false
        if(!$result) {
            return $result;
        }

        return $wpdb->query(
            $wpdb->prepare(
                "UPDATE wp_appointment SET available_places = available_places - 1 WHERE id = %d;",
                $appointment_id
            )
        );
    }

    public static function find_appointment($appointment_id)
    {
        global $wpdb;
        $result = $wpdb->get_results(
            "SELECT * FROM wp_appointment WHERE id = $appointment_id;"
        );
        return $result[0];
    }

    public static function find_booking_by_user($user_id)
    {
        global $wpdb;
        
        return $wpdb->get_results(
            "SELECT * FROM wp_booking WHERE user_id = $user_id;"
        );
    }

    public static function find_booking_by_appointment_and_user($appointment_id, $user_id)
    {
        global $wpdb;
        
        return $wpdb->get_results(
            "SELECT * FROM wp_booking WHERE a_id = $appointment_id AND user_id = $user_id;"
        );
    }

    /**
     * @param string $appointments_id Liste des id des RDV séparés par une virgule
     */
    public static function find_appointments_by_id($appointments_id)
    {
        global $wpdb;
        
        return $wpdb->get_results(
            "SELECT * FROM wp_appointment WHERE id IN ($appointments_id) AND start_date > CURRENT_DATE ORDER BY start_date ASC;"
        );
    }

    public static function delete_booking($appointment_id, $user_id)
    {
        global $wpdb;
        
        $wpdb->query(
            "DELETE FROM wp_booking WHERE a_id = $appointment_id AND user_id = $user_id;"
        );

        $wpdb->query(
            "UPDATE wp_appointment SET available_places = available_places + 1 WHERE id = $appointment_id;"
        );
    }
}
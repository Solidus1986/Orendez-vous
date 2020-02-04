<?php

class AppointmentRest
{
    public function __construct()
    {
        add_action('rest_api_init', [$this, 'show_appointments']);
        add_action('rest_api_init', [$this, 'book_appointments']);
        add_action('rest_api_init', [$this, 'my_appointments']);
        add_action('rest_api_init', [$this, 'delete_my_appointment']);
    }
    
    /**
     * @param  WP_REST_Request $request Full details about the request.
     */
    public function show_appointments($request)
    {
        register_rest_route('wp/v2', 'appointments', array(
            'methods' => 'GET',
            'callback' => [$this, 'rest_show_appointments_endpoint_handler']
        ));
    }

    /**
     * @param  WP_REST_Request $request Full details about the request.
     */
    public function rest_show_appointments_endpoint_handler($request = null)
    {
        $parameters = $request->get_params();
        if(!isset($parameters['type']) || !isset($parameters['user_id'])) {
            $error = new WP_Error();
            $error->add(400, __("Paramètre(s) manquant(s)", 'wp-rest-user'), array('status' => 400));
            return $error;
        }
        $type = sanitize_text_field($parameters['type']);
        $user_id = sanitize_text_field($parameters['user_id']);

        $results = CustomTable::read_available_appointments($user_id, $type);
        $appointments = [];
        foreach ($results as $appointment) {
            setlocale (LC_TIME, 'fr_FR.utf8','fra'); 
            $date = strftime('%A %d %B %Y', strtotime($appointment->start_date));
            $appointments[$date][] = $appointment;
        }
        
        return new WP_REST_Response($appointments);
    }

    /**
     * @param  WP_REST_Request $request Full details about the request.
     */
    public function book_appointments($request)
    {
        register_rest_route('wp/v2', 'appointments', array(
            'methods' => 'POST',
            'callback' => [$this, 'rest_new_appointment_endpoint_handler'],
            'permission_callback' => function($request){
                return is_user_logged_in();
            }
        ));
    }

    /**
     * @param  WP_REST_Request $request Full details about the request.
     */
    public function rest_new_appointment_endpoint_handler($request = null)
    {
        $parameters = $request->get_json_params();
        $appointment_id = sanitize_text_field($parameters['appointment_id']);
        $user_id = wp_get_current_user()->data->ID;

        // gestion de la carte d'abonnement
        // et vérification du nombre de places disponibles

        // on récupère les data du RDV qui est sur le point d'être réservé
        $data_appointment = CustomTable::find_appointment($appointment_id);
        // le type est soit osteo soit pilates
        $type = $data_appointment->type;
        $available_places = $data_appointment->available_places;
        $error = new WP_Error();

        // si le nombre de places disponibles est inférieur ou égal à zéro (cas où un autre utilisateur a validé sa réservation avant nous)
        // on retourne une erreur
        if ($available_places <= 0) {
            $error->add(400, __("Il n'y a plus de place pour cette séance.", 'wp-rest-user'), array('status' => 400));
            return $error;
        }
        // si le cours est de type pilates alors on check le nombre de séances de l'utilisateur
        if ($type == 'pilates') {
            $nb_seance = get_user_meta($user_id, 'nb_seance', true);

            // Si le nombre de séances est inférieur ou égale à zéro alors on renvoie un message d'erreur
            if($nb_seance <= 0) {
                $error->add(400, __("Vous n'avez plus de séance sur votre carte.", 'wp-rest-user'), array('status' => 400));
                return $error;
            }
            // sinon, on met à jour sa meta qui contient son nombre de séances
            update_user_meta($user_id, 'nb_seance', $nb_seance - 1);
        }

        // on met à jour le rendez-vous en enlevant une place disponible
        // et on crée une nouvelle entrée dans la table wp_booking pour relier le patient/client au RDV
        $result = CustomTable::book_appointment($appointment_id, $user_id);

        // on obtient false dans le cas où le RDV était déjà lié au user
        // (contrainte de clé étrangère)
        if (!$result) {
            $error->add(400, __("Vous êtes déjà inscrit à cette séance.", 'wp-rest-user'), array('status' => 400));
            return $error;
        }
        
        // Si tout s'est bien passé, on renvoie un code HTTP 200 avec un message
        $response = [];
        $response['code'] = 200;
        $response['message'] = __("Booking ok", "wp-rest-user");
        return new WP_REST_Response($response);
    }

    /**
     * @param  WP_REST_Request $request Full details about the request.
     */
    public function my_appointments($request)
    {
        register_rest_route('wp/v2', 'appointments/me', array(
            'methods' => 'GET',
            'callback' => [$this, 'rest_my_appointments_endpoint_handler'],
            'permission_callback' => function($request){
                return is_user_logged_in();
            }
        ));
    }

    /**
     * @param  WP_REST_Request $request Full details about the request.
     */
    public function rest_my_appointments_endpoint_handler($request = null)
    {
        // on récupère l'id du current user
        $user_id = wp_get_current_user()->data->ID;
        // dans la table wp_booking, on récupère les RDV associés à notre user
        $bookings = CustomTable::find_booking_by_user($user_id);

        // si le user n'a pas de réservation
        if(empty($bookings)) {
            $error = new WP_Error();
            $error->add(400, __("Vous n'avez pas de rendez-vous.", 'wp-rest-user'), array('status' => 400));
            return $error;
        }

        // on constitue un tableau qui contiendra tous les id des RDV du user
        foreach ($bookings as $booking) {
            $appointments[] = $booking->a_id;
        }
        // on transforme le tableau en chaine de caractère pour pouvoir l'utiliser dans notre requête SQL
        $appointments_string = implode(",", $appointments);
        
        // avec ce tableau, on récupère depuis wp_appointment les datas des RDV du user
        $data_appointments = CustomTable::find_appointments_by_id($appointments_string);
        
        // on retourne ces datas dans l'API
        return new WP_REST_Response($data_appointments);
    }

    /**
     * @param  WP_REST_Request $request Full details about the request.
     */
    public function delete_my_appointment($request)
    {
        register_rest_route('wp/v2', 'appointments/(?P<id>[\d]+)', array(
            'methods' => WP_REST_Server::DELETABLE,
            'callback' => [$this, 'rest_delete_my_appointment_endpoint_handler'],
            'permission_callback' => function($request){
                return is_user_logged_in();
            },
        ));
    }

    /**
     * @param  WP_REST_Request $request Full details about the request.
     */
    public function rest_delete_my_appointment_endpoint_handler($request = null)
    {
        // on récupère l'id du RDV qu'on souhaite annuler
        $appointment_id = $request['id'];

        // on fait qq vérif :
            // 1. on vérifie que le RDV est bien associé au user actuel
        $user_id = wp_get_current_user()->data->ID;
        $booking = CustomTable::find_booking_by_appointment_and_user($appointment_id, $user_id);
        $error = new WP_Error();
        if(empty($booking)) {
            $error->add(400, __("Vous n'avez pas de rendez-vous.", 'wp-rest-user'), array('status' => 400));
            return $error;
        }
            // 2. on vérifie si le RDV n'est pas dans les prochaines 48h
        $data_appointment = CustomTable::find_appointment($appointment_id);
        date_default_timezone_set('Europe/Paris');
        $start_date = new DateTime($data_appointment->start_date);
        $now = new DateTime();
        $diff = date_diff($start_date, $now, true);
        $days = $diff->format('%d');

        if($days < 2) {
            $error->add(400, __("Le rendez-vous n'est plus annulable", 'wp-rest-user'), array('status' => 400));
            return $error;
        }

        // si tout est ok, on supprime l'entrée dans la table wp_booking
        // et on rajoute une place disponible dans wp_appointment pour le RDV
        CustomTable::delete_booking($appointment_id, $user_id);
        // on recrédite le user avec une place si RDV pilates
        if($data_appointment->type == 'pilates') {
            $nb_seance = get_user_meta($user_id, 'nb_seance', true);
            update_user_meta($user_id, 'nb_seance', $nb_seance + 1);
        }

        $response = [];
        $response['code'] = 200;
        $response['message'] = __("Booking deleted", "wp-rest-user");
        return new WP_REST_Response($response);
    }
}
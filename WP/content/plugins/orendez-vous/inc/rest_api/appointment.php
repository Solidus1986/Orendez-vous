<?php

class AppointmentRest
{
    public function __construct()
    {
        add_action('rest_api_init', [$this, 'show_appointments']);
        add_action('rest_api_init', [$this, 'book_appointments']);
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
        $parameters = $request->get_json_params();
        $type = sanitize_text_field($parameters['type']);
        $user_id = sanitize_text_field($parameters['user_id']);

        $results = CustomTable::read_available_appointments($user_id, $type);
        return new WP_REST_Response($results);
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
}
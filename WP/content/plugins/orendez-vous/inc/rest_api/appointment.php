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

        // TODO identifier le type du rdv
        // si pilates :
        // checker le nombre de séance du user


        $result = CustomTable::book_appointment($appointment_id, $user_id);

        
        $error = new WP_Error();

        if (!$result) {
            $error->add(400, __("Vous êtes déjà inscrit à cette séance.", 'wp-rest-user'), array('status' => 400));
            return $error;
        }
        
        $response = [];
        $response['code'] = 200;
        $response['message'] = __("Booking ok", "wp-rest-user");
        return new WP_REST_Response($response);
    }
}
<?php

class AppointmentRest
{
    public function __construct()
    {
        add_action('rest_api_init', [$this, 'show_appointments']);
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
}
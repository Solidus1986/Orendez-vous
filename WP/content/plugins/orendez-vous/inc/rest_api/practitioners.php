<?php

class Practitioners
{
    public function __construct()
    {
        add_action('rest_api_init', [$this, 'get_practitioners']);
    }

    /**
     * @param  WP_REST_Request $request Full details about the request.
     */
    public function get_practitioners($request)
    {
        register_rest_route('wp/v2', 'practitioners', array(
            'methods' => 'GET',
            'callback' => [$this, 'rest_show_practitioners_endpoint_handler']
        ));
    }

    /**
     * @param  WP_REST_Request $request Full details about the request.
     */
    public function rest_show_practitioners_endpoint_handler($request = null)
    {
        $parameters = $request->get_json_params();
        $type = sanitize_text_field($parameters['type']);
        
        $users = get_users(['role' => $type]);
        $result = [];
        foreach ($users as $user) {
            $user_id = $user->data->ID;
            $user_meta = get_user_meta( $user_id);
            $first_name = $user_meta['first_name'][0];
            $last_name = $user_meta['last_name'][0];
            $result[] = [
                'id' => $user_id,
                'first_name' => $first_name,
                'last_name' => $last_name
            ];
        }

        return new WP_REST_Response($result);
    }
}
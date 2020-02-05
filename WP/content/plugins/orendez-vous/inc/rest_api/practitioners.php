<?php

class Practitioners
{
    public function __construct()
    {
        add_action('rest_api_init', [$this, 'get_practitioners']);
        add_action('rest_api_init', [$this, 'get_practitioner']);
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
        $parameters = $request->get_params();
        if(!isset($parameters['type']) || !in_array($parameters['type'], ["pilates","osteo"])) {
            $error = new WP_Error();
            $error->add(400, __("Le type n'est pas correct", 'wp-rest-user'), array('status' => 400));
            return $error;
        }
        $type = sanitize_text_field($parameters['type']);
        $type = $type == 'pilates' ? 'coach' : 'osteo';
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

    /**
     * @param  WP_REST_Request $request Full details about the request.
     */
    public function get_practitioner($request)
    {
        register_rest_route('wp/v2', 'practitioners/(?P<id>[\d]+)', array(
            'methods' => 'GET',
            'callback' => [$this, 'rest_show_practitioner_endpoint_handler']
        ));
    }

    /**
     * @param  WP_REST_Request $request Full details about the request.
     */
    public function rest_show_practitioner_endpoint_handler($request = null)
    {
        $user_id = $request['id'];
        $user = get_user_by('id', $user_id);
        $error = new WP_Error();
        if(!$user) {
            $error->add(400, __("Cet utilisateur n'existe pas", 'wp-rest-user'), array('status' => 400));
            return $error;
        }
        var_dump($user->roles);
        if(in_array('subscriber', $user->roles)) {
            $error->add(400, __("Cet utilisateur n'est pas un praticien", 'wp-rest-user'), array('status' => 400));
            return $error;
        }
        $user_meta = get_user_meta($user_id);
        $first_name = $user_meta['first_name'][0];
        $last_name = $user_meta['last_name'][0];
        $result[] = [
            'id' => $user_id,
            'first_name' => $first_name,
            'last_name' => $last_name
        ];

        return new WP_REST_Response($result);
    }
}
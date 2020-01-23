<?php

class oRdvRestApi
{
    public function __construct()
    {
        add_action('rest_api_init', [$this, 'metaFields']);
        add_action('rest_api_init', [$this, 'thumbnailField']);
        add_action('rest_api_init', [$this, 'register_user']);
        add_action('rest_api_init', [$this, 'metaUsers']);
    }

    public function metaFields()
    {
        register_rest_field(
            [
                Osteo_cpt::CPT_OSTEO,
                Pilates_cpt::CPT_PILATES
            ],
            'meta',
            [
                // fonction à appeler lors d'un GET
                'get_callback' => [$this, 'getMetaCf'],
                // Fonction à appeler lors d'un POST
                'update_callback' => null,
                // Structure de la donnée
                'schema' => null
            ]
        );
    }

    public function getMetaCf($object, $field_name, $request)
    {
        // https://developer.wordpress.org/reference/functions/get_post_meta/

        $all_meta = get_post_meta($object['id']);

        $array_return = [];

        // on parcours toutes les metas
        foreach ($all_meta as $meta_name => $meta_value) {
            // https://www.php.net/manual/fr/function.substr.php
            // on "filtre" les meta pour ne récupérer que les CF
            if (substr($meta_name, 0, 1) !== '_') {
                $array_return[$meta_name] = str_replace("\r\n", "<br>", $meta_value[0]);
            }
        }

        // je retourne l'array
        return $array_return;
    }

    public function thumbnailField()
    {
        register_rest_field(
            [
                Osteo_cpt::CPT_OSTEO,
                Pilates_cpt::CPT_PILATES
            ],
            'thumbnail_url',
            [
                'get_callback' => [$this, 'getThumbnail'],
                'update_callback' => null,
                'schema' => null
            ]
        );
    }
    
    public function getThumbnail($object, $field_name, $request)
    {
        if (has_post_thumbnail($object['id'])) {
            return get_the_post_thumbnail_url($object['id']);
        } else {
            return false;
        }
    }

    /**
     * @param  WP_REST_Request $request Full details about the request.
     */
    public function register_user($request)
    {
        register_rest_route('wp/v2', 'users/register', array(
            'methods' => 'POST',
            'callback' => [$this, 'rest_user_endpoint_handler'],
          ));
    }

    /**
     * @param  WP_REST_Request $request Full details about the request.
     */
    public function rest_user_endpoint_handler($request = null)
    {
        $response = [];
        $parameters = $request->get_json_params();
        $firstname = sanitize_text_field($parameters['firstname']);
        $lastname = sanitize_text_field($parameters['lastname']);
        $phone_number = sanitize_text_field($parameters['phone_number']);
        $username = sanitize_text_field($parameters['username']);
        $email = sanitize_text_field($parameters['email']);
        $password = sanitize_text_field($parameters['password']);

        $error = new WP_Error();
        if (empty($username)) {
            $error->add(400, __("Username field 'username' is required.", 'wp-rest-user'), array('status' => 400));
            return $error;
        }
        if (empty($email)) {
            $error->add(401, __("Email field 'email' is required.", 'wp-rest-user'), array('status' => 400));
            return $error;
        }
        if (empty($password)) {
            $error->add(404, __("Password field 'password' is required.", 'wp-rest-user'), array('status' => 400));
            return $error;
        }
        if (empty($phone_number)) {
            $error->add(404, __("Phone Number field 'phone_number' is required.", 'wp-rest-user'), array('status' => 400));
            return $error;
        }
        if (empty($firstname)) {
            $error->add(404, __("First Name field 'firstname' is required.", 'wp-rest-user'), array('status' => 400));
            return $error;
        }
        if (empty($lastname)) {
            $error->add(404, __("Last Name field 'lastname' is required.", 'wp-rest-user'), array('status' => 400));
            return $error;
        }

        // $user_id = false si username n'existe pas
        // $user_id = un id (un chiffre) si le user existe
        $user_id = username_exists($username);
        if (!$user_id && email_exists($email) == false) {
            $user_id = wp_create_user($username, $password, $email);
            if (!is_wp_error($user_id)) {
                wp_update_user([
                    'ID' => $user_id,
                    'first_name' => $firstname,
                    'last_name' => $lastname
                ]);
                add_user_meta($user_id, 'nb_seance', 1);
                add_user_meta($user_id, 'phone_number', $phone_number);
                $response['code'] = 200;
                $response['message'] = __("User '" . $username . "' Registration was Successful", "wp-rest-user");
            }
        } else {
            $error->add(406, __("Email or Username already exists.", 'wp-rest-user'), array('status' => 400));
            return $error;
        }

        return new WP_REST_Response($response);
    }

    public function metaUsers()
    {
        register_rest_field(
            'user',
            'meta',
            [
                // fonction à appeler lors d'un GET
                'get_callback' => [$this, 'user_meta_callback'],
                // Fonction à appeler lors d'un POST
                'update_callback' => null,
                // Structure de la donnée
                'schema' => null
            ]
        );
    }

    public function user_meta_callback($user, $field_name, $request)
    {
        $current_user_ID = wp_get_current_user()->data->ID;
        $current_user_role = wp_get_current_user()->roles[0];
        // Sécurité :
        // On veut masquer les meta pour les users de rôle Abonné (subscriber)
        // Sauf pour l'url de l'API /users/me, puisque ce sont leurs infos personnelles
        if($current_user_role == 'subscriber' && $user['id'] != $current_user_ID) {
            return $meta = [];
        }

        // Ici, on est sûr qu'on affiche les meta uniquement
        // - soit aux users qui ont a minima le rôle Contributeur
        // - soit à l'utilisateur qui cherche à accéder à ses propres informations
        $data = get_userdata($user[ 'id' ]);
        $allMeta = get_user_meta( $user[ 'id' ]);
        $meta = [
            'first_name' => $allMeta['first_name'][0],
            'last_name' => $allMeta['last_name'][0],
            'nb_seance' => isset($allMeta['nb_seance'][0]) ? $allMeta['nb_seance'][0] : '',
            'phone_number' => isset($allMeta['phone_number'][0]) ? $allMeta['phone_number'][0] : '',
            'email' => $data->user_email
        ];
        return $meta;
    }
}
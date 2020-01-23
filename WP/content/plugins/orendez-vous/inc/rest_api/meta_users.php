<?php

class MetaUsers
{
    public function __construct()
    {
        add_action('rest_api_init', [$this, 'metaUsers']);
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
        // si on n'est pas connecté, on quitte la fonction en retournant un tableau vide
        if(!is_user_logged_in()) {
            return $meta = [];
        }

        $current_user_ID = wp_get_current_user()->data->ID;
        $current_user_role = wp_get_current_user()->roles[0];

        // Sécurité :
        // On veut masquer les meta pour les users de rôle Abonné (subscriber)
        // Sauf pour l'url de l'API /users/me, puisque ce sont leurs infos personnelles
        // Donc si on est seulement abonné, et qu'on n'est pas sur users/me, on retourne un tableau vide
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
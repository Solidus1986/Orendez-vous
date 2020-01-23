<?php

class MetaFields
{
    public function __construct()
    {
        add_action('rest_api_init', [$this, 'metaFields']);
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
}
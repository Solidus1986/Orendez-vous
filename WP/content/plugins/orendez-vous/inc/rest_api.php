<?php

class oRdvRestApi
{
    public function __construct()
    {
        add_action('rest_api_init', [$this, 'metaFields']);
        add_action('rest_api_init', [$this, 'thumbnailField']);
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

        // on parcours toutes les meta
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
}
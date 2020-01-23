<?php

class ThumbnailField
{
    public function __construct()
    {
        add_action('rest_api_init', [$this, 'thumbnailField']);
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
<?php

class Info_cpt
{
    public const CPT_INFO = 'info';

    public function __construct()
    {
        add_action('init', [$this, 'create_cpt']);
    }

    public function create_cpt()
    {
        $labels = [
            'name'               => 'Informations pratiques',
            'singular_name'      => 'Informations pratiques',
            'menu_name'          => 'Informations pratiques',
            'name_admin_bar'     => 'Informations pratiques',
            'add_new'            => 'Ajouter une nouvelle information pratique',
            'add_new_item'       => 'Ajouter une nouvelle information pratique',
            'new_item'           => 'Nouvelle information pratique',
            'edit_item'          => 'Editer une information pratique',
            'view_item'          => 'Voir l\'information pratique',
            'all_items'          => 'Voir toutes les informations pratiques',
            'search_items'       => 'Rechercher une information pratique',
            'not_found'          => 'Aucune information pratique trouvée',
            'not_found_in_trash' => 'Aucune information pratique trouvée dans la corbeille',
        ];

        $args = [
            'labels' => $labels,
            'public' => true,
            'label' => 'Informations pratiques',
            'menu_position' => 3,
            // https://developer.wordpress.org/resource/dashicons
            'menu_icon' => 'dashicons-info',
            'hierarchical' => false,
            'exlude_from_search' => true,
            'publicly_queryable' => false,
            'supports' => [
                'title',
                'editor',
                'excerpt',
                'thumbnail',
                'custom-fields',
                'revisions',
            ],
            'show_in_rest' => true,
            'map_meta_cap' => true,
            'capability_type'   => 'info',
        ];

        register_post_type(self::CPT_INFO, $args);
    }

    
    public function activation()
    {
        $this->create_cpt();

        flush_rewrite_rules();
    }

    public function deactivation()
    {
        flush_rewrite_rules();
    }
}


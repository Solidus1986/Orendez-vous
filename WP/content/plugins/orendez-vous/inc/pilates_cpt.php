<?php

class Pilates_cpt
{
    public const CPT_PILATES = 'pilates';

    public function __construct()
    {
        add_action('init', [$this, 'create_cpt']);
        add_action('init', [$this, 'create_taxo']);
    }

    public function create_cpt()
    {
        $labels = [
            'name'               => 'Pilates',
            'singular_name'      => 'Pilates',
            'menu_name'          => 'Pilates',
            'name_admin_bar'     => 'Pilates',
            'add_new'            => 'Ajouter un Article en rapport avec le Pilates',
            'add_new_item'       => 'Ajouter un nouvel Article en rapport avec le Pilates',
            'new_item'           => 'Nouvel Article en rapport avec le Pilates',
            'edit_item'          => 'Editer un Article en rapport avec le Pilates',
            'view_item'          => 'Voir le Article en rapport avec le Pilates',
            'all_items'          => 'Voir tous les Articles en rapport avec le Pilates',
            'search_items'       => 'Rechercher un Article en rapport avec le Pilates',
            'not_found'          => 'Aucun Article en rapport avec le Pilates trouve',
            'not_found_in_trash' => 'Aucun Article en rapport avec le Pilates trouve dans la corbeille',
        ];

        $args = [
            'labels' => $labels,
            'public' => true,
            'label' => 'Pilates',
            'menu_position' => 3,
            // https://developer.wordpress.org/resource/dashicons
            'menu_icon' => 'dashicons-smiley',
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
        ];

        register_post_type(self::CPT_PILATES, $args);
    }

    public function create_taxo()
    {
        register_taxonomy(
            'category-pilates',
            self::CPT_PILATES,
            [
                'label' => 'Catégories de Contenu',
                'public' => true,
                'hierarchical' => true,
                'show_admin_column' => true,
                'show_in_menu' => false,
                'show_in_nav_menus' => false,
                'capabilities' => [
                    'manage_terms'  => 'manage_categories',
                    'edit_terms'    => 'manage_categories',
                    'delete_terms'  => 'manage_categories',
                    'assign_terms'  => 'edit_posts'
                ],
                'rewrite' => [
                    'slug' => 'category-pilates'
                ],
                'show_in_rest' => true
            ]
        );
        wp_insert_term(
            'Informations pratiques Pilates',
            'category-pilates',
            [
                'slug' => 'infos-pratiques-pilates'
            ]
        );

        wp_insert_term(
            'Coach',
            'category-pilates',
            [
                'slug' => 'Coach'
            ]
        );
    }
    public function activation()
    {
        $this->create_cpt();
        $this->create_taxo();

        flush_rewrite_rules();
    }

    public function deactivation()
    {
        flush_rewrite_rules();
    }
}


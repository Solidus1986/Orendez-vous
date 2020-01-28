<?php

class Osteo_cpt
{
    public const CPT_OSTEO = 'osteopathie';

    public function __construct()
    {
        add_action('init', [$this, 'create_cpt']);
        add_action('init', [$this, 'create_taxo']);
    }

    public function create_cpt()
    {
        // https://developer.wordpress.org/reference/functions/get_post_type_labels/
        $labels = [
            'name'               => 'Ostéopathes',
            'singular_name'      => 'Ostéopathe',
            'menu_name'          => 'Ostéopathes',
            'name_admin_bar'     => 'Ostéopathe',
            'add_new'            => 'Ajouter un Article en rapport avec l\'Ostéopathie',
            'add_new_item'       => 'Ajouter un nouvel Article en rapport avec l\'Ostéopathie',
            'new_item'           => 'Nouvel Article en rapport avec l\'Ostéopathie',
            'edit_item'          => 'Editer un Article en rapport avec l\'Ostéopathie',
            'view_item'          => 'Voir le Article en rapport avec l\'Ostéopathie',
            'all_items'          => 'Voir tous les Articles en rapport avec l\'Ostéopathie',
            'search_items'       => 'Rechercher un Article en rapport avec l\'Ostéopathie',
            'not_found'          => 'Aucun Article en rapport avec l\'Ostéopathie trouvé',
            'not_found_in_trash' => 'Aucun Article en rapport avec l\'Ostéopathie trouvé dans la corbeille',
        ];

        $args = [
            'labels' => $labels,
            'public' => true,
            'menu_position' => 3,
            // https://developer.wordpress.org/resource/dashicons
            'menu_icon' => 'dashicons-buddicons-buddypress-logo',
            'hierarchical' => false,
            'has_archive' => true,
            'rewrite' => [
                'slug' => 'mon-osteopathie'
            ],
            'supports' => [
                'title',
                'editor',
                'author',
                'excerpt',
                'thumbnail',
                'revisions',
                'custom-fields',
            ],
            'show_in_rest' => true,
            'map_meta_cap' => true,
            'capability_type'   => 'osteo',
        ];

        register_post_type(self::CPT_OSTEO, $args);
    }

    public function create_taxo()
    {
        register_taxonomy(
            'category-osteo',
            self::CPT_OSTEO,
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
                'slug' => 'category-osteo'
                ],
                'show_in_rest' => true
            ]
        );

        wp_insert_term(
            'Publics',
            'category-osteo',
            [
                'slug' => 'publics'
            ]
        );

        wp_insert_term(
            'Praticiens',
            'category-osteo',
            [
                'slug' => 'praticiens'
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
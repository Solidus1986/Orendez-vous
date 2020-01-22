<?php

class Info_custom_field
{
    public const FIELD_GROUP_KEY = 'info_field_group';
    public const FIELD_WORKFLOW_KEY = 'info_field_workflow';
    public const FIELD_PRICE_KEY = 'info_field_price';
    public const FIELD_HISTORY_KEY = 'info_field_history';
    public const FIELD_CONTACT_KEY = 'info_field_contact';

    public function __construct()
    {
        add_action('acf/init', [$this, 'register_info_field_group']);
        add_action('acf/init', [$this, 'register_info_fields']);
    }

    public function register_info_field_group()
    {
        acf_add_local_field_group(
            [
                'key' => self::FIELD_GROUP_KEY,
                'title' => 'Informations supplémentaires',
                'location' => [
                    [
                        [
                            'param'     => 'post_type',
                            'operator'  => '==',
                            'value'     => Osteo_cpt::CPT_OSTEO
                        ],
                        [
                            'param'     => 'post_taxonomy',
                            'operator'  => '==',
                            'value'     => 'category-osteo:infos-pratiques-osteo'
                        ]
                    ],
                    [
                        [
                            'param'     => 'post_type',
                            'operator'  => '==',
                            'value'     => Pilates_cpt::CPT_PILATES
                        ],
                        [
                            'param'     => 'post_taxonomy',
                            'operator'  => '==',
                            'value'     => 'category-pilates:infos-pratiques-pilates'
                        ]
                    ]

                ],
                'menu_order' => 0,
                'position' => 'normal',
                'style' => 'default',
                'label_placement' => 'top',
                'instruction_placement' => 'label',
                'description' => 'Groupe de champs pour indiquer les informations pratiques du cabinet'
            ]
        );
    }

    public function register_info_fields()
    {
        acf_add_local_field(
            [
                'key' => self::FIELD_WORKFLOW_KEY,
                'label' => 'Déroulement de la séance',
                'name' => 'workflow',
                'type' => 'wysiwyg',
                'parent' => self::FIELD_GROUP_KEY,
            ]
        );

        acf_add_local_field(
            [
                'key' => self::FIELD_PRICE_KEY,
                'label' => 'Prix d\'une séance',
                'name' => 'price',
                'type' => 'wysiwyg',
                'parent' => self::FIELD_GROUP_KEY,
            ]
        );

        acf_add_local_field(
            [
                'key' => self::FIELD_HISTORY_KEY,
                'label' => 'Histoire et Législation',
                'name' => 'history',
                'type' => 'wysiwyg',
                'parent' => self::FIELD_GROUP_KEY,
            ]
        );

        acf_add_local_field(
            [
                'key' => self::FIELD_CONTACT_KEY,
                'label' => 'Contact',
                'name' => 'contact',
                'type' => 'wysiwyg',
                'parent' => self::FIELD_GROUP_KEY,
            ]
        );
    }

    public function activation()
    {
        $this->register_info_field_group();
        $this->register_info_fields();
    }

    public function deactivation()
    {
        acf_remove_local_field(self::FIELD_WORKFLOW_KEY);
        acf_remove_local_field(self::FIELD_PRICE_KEY);
        acf_remove_local_field(self::FIELD_HISTORY_KEY);
        acf_remove_local_field(self::FIELD_CONTACT_KEY);
        acf_remove_local_field_group(self::FIELD_GROUP_KEY);
    }
}
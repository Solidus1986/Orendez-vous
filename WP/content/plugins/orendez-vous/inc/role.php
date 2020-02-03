<?php

class ORdvRole
{
    public function __construct()
    {
        $this->addRole();
        $this->manageCap();
    }

    public function addRole()
    {
        add_role(
            'osteo',
            'Ostéopathe',
            [
                'read' => true,
                'upload_files' => true
            ]
        );

        add_role(
            'coach',
            'Coach Pilates',
            [
                'read' => true,
                'upload_files' => true
            ]
        );
    }
    
    public function manageCap()
    {
        $subscriber_role = get_role('subscriber');
        $subscriber_role->remove_cap('read');
        
        $osteo_roles = [
            'administrator',
            'osteo'
        ];

        foreach ($osteo_roles as $role_name) {
            $role = get_role($role_name);
            $role->add_cap('read_osteos');
            $role->add_cap('delete_osteos');
            $role->add_cap('delete_private_osteos');
            $role->add_cap('delete_published_osteos');
            $role->add_cap('delete_others_osteos');
            $role->add_cap('edit_private_osteos');
            $role->add_cap('edit_published_osteos');
            $role->add_cap('edit_others_osteos');
            $role->add_cap('edit_osteos');
            $role->add_cap('publish_osteos');
            $role->add_cap('moderate_comments');
        }

        $pilates_roles = [
            'administrator',
            'coach'
        ];

        foreach ($pilates_roles as $role_name) {
            $role = get_role($role_name);
            $role->add_cap('read_pilatess');
            $role->add_cap('delete_pilatess');
            $role->add_cap('delete_private_pilatess');
            $role->add_cap('delete_published_pilatess');
            $role->add_cap('delete_others_pilatess');
            $role->add_cap('edit_private_pilatess');
            $role->add_cap('edit_published_pilatess');
            $role->add_cap('edit_others_pilatess');
            $role->add_cap('edit_pilatess');
            $role->add_cap('publish_pilatess');
            $role->add_cap('moderate_comments');
        }

            $admin = get_role('administrator');
            $admin->add_cap('read_infos');
            $admin->add_cap('delete_infos');
            $admin->add_cap('delete_private_infos');
            $admin->add_cap('delete_published_infos');
            $admin->add_cap('delete_others_infos');
            $admin->add_cap('edit_private_infos');
            $admin->add_cap('edit_published_infos');
            $admin->add_cap('edit_others_infos');
            $admin->add_cap('edit_infos');
            $admin->add_cap('publish_infos');

        $practicioners = [
            'osteo',
            'coach'
        ];

        foreach ($practicioners as $role_name) {
            $role = get_role($role_name);
            $role->remove_cap('edit_posts');
            $role->remove_cap('edit_published_posts');
            $role->remove_cap('delete_posts');
        }
    }

    public function removeRole()
    {
        remove_role('osteo');
        remove_role('coach');
    }

    public function activation()
    {
        $this->addRole();
        $this->manageCap();
    }

    public function deactivation()
    {
        $this->removeRole();
    }
}
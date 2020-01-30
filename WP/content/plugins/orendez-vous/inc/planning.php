<?php

class Planning
{   public function __construct()
    {
        $this->new_page();
    }

    public function new_page()
    {
        add_submenu_page(
            'rendez-vous',
            'Mon Planning',
            'Mon Planning',
            'moderate_comments',
            'planning',
            [$this, 'page_content'],
             1
        );
    }

    public function page_content()
    {
        $current_user_ID = wp_get_current_user()->data->ID;

        $appointments = CustomTable::read_appointment($current_user_ID);

        echo '
        
        <h1>Consulter mon planning</h1>

        <table class="orendezvous-table">
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Heure de début</th>
                    <th>Heure de fin</th>
                    <th>Place dispo</th>
                    <th>Place max</th>
                    <th colspan="3">Actions</th>
                </tr>
            </thead>
            <tbody>';
        
            foreach ($appointments as $appointment ) {
                $type = $appointment->type;
                $type = $type == 'osteo' ? 'Ostéopathie' : 'Pilates';
                setlocale (LC_TIME, 'fr_FR.utf8','fra'); 
                $date = strftime('%A %d %B %Y', strtotime($appointment->start_date));
                $start_time = strftime('%H:%M', strtotime($appointment->start_date));
                $end_time = strftime('%H:%M', strtotime($appointment->end_date));
                $available_places = $appointment->available_places;
                $max_places = $appointment->max_places;

                echo "
                <tr>
                    <td>$type</td>
                    <td>$date</td>
                    <td>$start_time</td>
                    <td>$end_time</td>
                    <td>$available_places</td>
                    <td>$max_places</td>
                    <td><a class='btn btn-success' href=''>Afficher le(s) patient(s)</a></td>
                    <td><a class='btn btn-primary' href=''>Modifier</a></td>
                    <td><a class='btn btn-danger' href=''>Supprimer</a></td>
                </tr>
                ";
            }
        echo '</tbody>
        </table>
        ';
    }
}
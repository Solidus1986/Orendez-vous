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
        if(!empty($_GET['appointment_id'])) {
            return $this->show_patients();
        }
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
                    <td><a class='btn btn-success' href='?page=planning&appointment_id=$appointment->id'>Afficher le(s) patient(s)</a></td>
                    <td><a class='btn btn-primary' href=''>Modifier</a></td>
                    <td><a class='btn btn-danger' href=''>Supprimer</a></td>
                </tr>
                ";
            }
        echo '</tbody>
        </table>
        ';
    }

    public function show_patients()
    {
        echo '
        <h1>Détail du rendez-vous</h1>
        ';
        // afficher un rappel des données du RDV :
        $appointment_id = $_GET['appointment_id'];
        $data_appointment = CustomTable::find_appointment($appointment_id);
        // si l'id ne correspond à aucun RDV : message d'erreur
        if(is_null($data_appointment)) {
            echo '
            <p class="error">Pas de rendez-vous trouvé.</p>
            <a href="?page=planning" class="btn btn-success">Retour vers le planning<a>
            ';
            return;
        }
        $type = $data_appointment->type;
        $type = $type == 'osteo' ? 'Ostéopathie' : 'Pilates';
        setlocale (LC_TIME, 'fr_FR.utf8','fra'); 
        $date = strftime('%A %d %B %Y', strtotime($data_appointment->start_date));
        $start_time = strftime('%H:%M', strtotime($data_appointment->start_date));
        $end_time = strftime('%H:%M', strtotime($data_appointment->end_date));
        $available_places = $data_appointment->available_places;
        $max_places = $data_appointment->max_places;

        echo "
        <p><strong>Type </strong>: $type</p>
        <p><strong>Date </strong>: $date</p>
        <p><strong>Heure de début </strong>: $start_time</p>
        <p><strong>Heure de fin </strong>: $end_time</p>
        <p><strong>Nombre de place(s) disponible(s) </strong>: $available_places / $max_places</p>
        ";

        // à partir de l'id du RDV : retrouver les booking
        $bookings = CustomTable::find_booking_by_appointment_and_user($appointment_id, 'user_id');

        // si pas de résa, message d'info
        if(empty($bookings)) {
            echo '
            <p class="error">Pas de patient pour ce rendez-vous.</p>
            <a href="?page=planning" class="btn btn-success">Retour vers le planning<a>
            ';
            return;
        }

        echo '<table class="orendezvous-table">
        <thead>
            <tr>
                <th>Nom</th>
                <th>Téléphone</th>
            </tr>
        </thead>
        <tbody>';

        // à partir des bookings : retrouver les patients
        foreach ($bookings as $booking) {
            $user_id = $booking->user_id;
            $user_meta = get_user_meta($user_id);
            // pour chaque patient : afficher ses informations (nom, prénom, téléphone)
            $first_name = $user_meta['first_name'][0];
            $last_name = $user_meta['last_name'][0];
            $phone_number = $user_meta['phone_number'][0];

            echo "
            <tr>
                <td>$first_name $last_name</td>
                <td><a href=\"tel:$phone_number\">$phone_number</a></td>
            </tr>
            ";
        }

        // et à la fin un bouton retour vers la page de planning
        echo '</tbody>
        </table>
        <a href="?page=planning" style="margin-top: 1rem;" class="btn btn-success">Retour vers le planning<a>
        ';
    }
}
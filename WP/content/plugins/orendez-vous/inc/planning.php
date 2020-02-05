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
        if(!empty($_GET['appointment_id']) && !empty($_GET['action'])) {
            if($_GET['action'] == "show") {
                return $this->show_patients();
            } else if($_GET['action'] == "delete") {
                return $this->delete_appointment();
            }
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
                    <th colspan="2">Actions</th>
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
                    <td><a class='btn btn-success' href='?page=planning&appointment_id=$appointment->id&action=show'>Afficher le(s) patient(s)</a></td>
                    <td><a class='btn btn-danger' href='?page=planning&appointment_id=$appointment->id&action=delete'>Supprimer</a></td>
                </tr>
                ";
            }
        echo '</tbody>
        </table>
        ';
    }

    public function show_patients($show_title = true, $show_button = true)
    {
        if($show_title) {
            echo '
            <h1>Détail du rendez-vous</h1>
            ';
        }
        // afficher un rappel des données du RDV :
        $appointment_id = $_GET['appointment_id'];
        $data_appointment = CustomTable::find_appointment($appointment_id);
        // si l'id ne correspond à aucun RDV : message d'erreur
        if(is_null($data_appointment)) {
            echo '
            <p class="error">Pas de rendez-vous trouvé.</p>';
            if($show_button) {
                echo '<a href="?page=planning" class="btn btn-success">Retour vers le planning<a>
                ';
            }
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
            <p class="error">Pas de patient pour ce rendez-vous.</p>';

            if($show_button) {
                echo '<a href="?page=planning" class="btn btn-success">Retour vers le planning<a>
                ';
            }

            return [$data_appointment, $bookings];
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
        </table>';
        if($show_button) {
            echo '<a href="?page=planning" style="margin-top: 1rem;" class="btn btn-success">Retour vers le planning<a>
            ';
        }
        return [
            'data_appointment' => $data_appointment, 
            'data_booking' => $bookings,
        ];
    }

    public function delete_appointment()
    {
        echo '<h1>Suppression du rendez-vous</h1>';
        
        // afficher les détails du RDV + récupérer les données du RDV
        $data = $this->show_patients(false, false);

        echo '
        <form method="post">
            <input name="id" id="id" type="hidden" value="' . $_GET["appointment_id"] . '">
            <button type="submit" class="btn btn-danger" style="margin-top: 1rem; line-height: 1.4em;">Supprimer</button>
            <a href="?page=planning" style="margin-top: 1rem;" class="btn btn-success">Retour vers le planning<a>
        </form>
        ';

        // gestion de la soumission du formulaire
        if(!empty($_POST)) {
            if(is_null($data)) {
                return;
            }
            // s'il y a des réservations
            if(!empty($data['data_booking'])) {
                // TODO : on envoie un mail pour prévenir de l'annulation
                // si c'est une séance pilates
                $type = $data['data_appointment']->type;
                if($type == "pilates") {
                    // recrédite les users avec 1 séance
                    foreach($data['data_booking'] as $booking) {
                        $user_id = $booking->user_id;
                        $old_nb_seance = get_user_meta($user_id, 'nb_seance', true);
                        update_user_meta($user_id, 'nb_seance', $old_nb_seance + 1);
                    }
                }
            }

            // on supprime le RDV de la table wp_appointment
            // normalement, avec la contrainte de clé étrangère, les réservations dans wp_booking devraient être supprimées (à vérifier)
            CustomTable::delete_appointment($_POST['id']);
            
            // affichage d'un message de confirmation de la suppression
            echo '<p class="success">Rendez-vous supprimé.</p>';
        }
       
      
    }
}
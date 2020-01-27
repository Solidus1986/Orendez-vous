<?php

use When\When;

class Appointment
{
    public function __construct()
    {
        $this->new_page();
    }

    public function new_page()
    {
        add_menu_page(
            'Rendez-vous',
            'Rendez-vous',
            'moderate_comments',
            'rendez-vous',
            [$this, 'page_content'],
            'dashicons-calendar-alt',
            6
        );
    }

    public function page_content()
    {
        $select_options_minutes = '';

        for ($i=0; $i < 60; $i+=15) {
            $select_options_minutes .= '<option value="' . $i . '">' . $i . '</option>';
        }

        $select_options_hours = '';

        for ($i=0; $i < 24; $i++) {
            $select_options_hours .= '<option value="' . $i . '">' . $i . '</option>';
        }

        $date = date('Y-m-d');

        // On affiche le champ pour le nombre de places dispo uniquement pour les coach pilates et les admin du site
        $current_user_role = wp_get_current_user()->roles[0];
        $txt = '';
        if($current_user_role == 'coach' || $current_user_role == 'administrator') {
            $txt = '<label for="available_places">Place(s) disponible(s)</label>
            <input type="number" name="available_places" id="available_places" min="1"  value="1" required>';
        }

        echo '
        <h1>Créer des nouveaux créneaux</h1>
        <form action="" method="POST">
            <label for="type">Type</label>
            <select name="type" id="type">
                <option value="osteo">Ostéopathie</option>
                <option value="pilates">Pilates</option>
            </select>
            <label for="start_date">Début de la planification</label>
            <input type="date" name="start_date" id="start_date" value="' . $date . '">
            <label for="weeks">Nombre de semaines de planification</label>
            <input type="number" name="weeks" id="weeks" value="1" min="1">
            <fieldset>
                <legend>Jour de la semaine</legend>
                <label for="monday">Lundi</label>
                <input name="day[]" id="monday" type="checkbox" value="mo">
                <label for="tuesday">Mardi</label>
                <input name="day[]" id="tuesday" type="checkbox" value="tu">
                <label for="wednesday">Mercredi</label>
                <input name="day[]" id="wednesday" type="checkbox" value="we">
                <label for="thursday">Jeudi</label>
                <input name="day[]" id="thursday" type="checkbox" value="th">
                <label for="friday">Vendredi</label>
                <input name="day[]" id="friday" type="checkbox" value="fr">
                <label for="saturday">Samedi</label>
                <input name="day[]" id="saturday" type="checkbox" value="sa">
                <label for="sunday">Dimanche</label>
                <input name="day[]" id="sunday" type="checkbox" value="su">
            </fieldset>
            <label for="start_time_hours">Heure de début</label>
            <select name="start_time_hours" id="start_time_hours">' .
            $select_options_hours
            . '</select>
            <select name="start_time_minutes" id="start_time_minutes">' .
            $select_options_minutes
            . '</select>
            <label for="length">Durée en minutes</label>
            <input type="number" name="length" id="length" min="0" required value="1">' .
            $txt
            . '<button type="submit">Créer</button>
        </form>
        ';

        if(!empty($_POST)) {
            $this->handle_form_submit();
        }
    }

    public function handle_form_submit()
    {
        // Date sélectionnée au format objet Date
        $date = new DateTime($_POST['start_date'] . $_POST['start_time_hours'] . ':' . $_POST['start_time_minutes']);
        // conversion de la date en string (par exemple 2020-01-27)
        $timestring = strtotime($_POST['start_date']);
        // récupération du jour de la semaine en minuscule
        $weekday = strtolower(date('l', $timestring));

        // Si aucun jour de la semaine n'est coché, on affiche un message à l'utilisateur
        if (empty($_POST['day'])) {
            echo 'Merci de choisir au moins un jour dans la liste.';
            return;
        }
        // Si le jour de la semaine (lundi, mardi, mercredi ..) se référant à la date de publication n'est pas coché alors on affiche un message d'erreur :
        if (!in_array(substr($weekday, 0, 2), $_POST['day'])) {
            echo 'Le début de planification doit correspondre à un des jours de la semaine.';
            return;
        }

        // on convertit en string le tableau des jours sélectionnés (par exemple "mo, tu, we")
        $weekdays = implode(', ', $_POST['day']);

        // Calcul du nombre de jours à retourner
        $count = count($_POST['day']) * $_POST['weeks'];

        // on récupère le nombre de places disponibles dans le formulaire
        // ou on met par défaut 1 (cas des RDV ostéopathes)
        $available_places = isset($_POST['available_places']) ? $_POST['available_places'] : 1 ;

        // on utilise le package when (récupéré avec composer)
        // La méthode generateOccurrences retourne un tableau d'occurences
        $r = new When();
        $r->startDate($date)
        ->freq("weekly")
        ->count($count)
        ->byday($weekdays)
        ->generateOccurrences();

        // on boucle sur le tableau des occurences
        // pour chaque occurence, on va faire une requête pour insérer une nouvelle entrée dans la table wp_appointment
        foreach($r->occurrences as $value) {
            echo '<pre>';
            print_r($value->format('Y-m-d H:i:s'));
            echo '<pre>';
        }
    }
}
<?php

class CustomersPilates
{
    public function __construct()
    {
        $this->new_page();
    }

    public function new_page()
    {
        add_submenu_page(
            'edit.php?post_type=pilates',
            'Carte de séances',
            'Carte de séances',
            'moderate_comments',
            'carte-de-seance',
            [$this, 'page_content']
        );
    }

    public function page_content()
    {
        if(!empty($_POST)) {
            $this->handle_form_submit();
        }

        $users = get_users('orderby=meta_value&meta_key=first_name');
        $options = '';
        foreach ($users as $user) {
            $user_id = $user->data->ID;
            $user_meta = get_user_meta( $user_id);
            $first_name = $user_meta['first_name'][0];
            $last_name = $user_meta['last_name'][0];
            $nb_seance = $user_meta['nb_seance'][0];
            $options .= "
            <option value='$user_id'>
                $first_name $last_name - $nb_seance
            </option>
            ";
        }

        

        echo '
        <h1>Mettre à jour les séances d\'un abonné</h1>
        <form class="orendezvous-form" method="post">
            <div>
                <label for="user">Nom de l\'abonné - Nombre de séance(s)</label>
                <select name="user" id="user">
                    <option>
                        -- Sélectionner un abonné --
                    </option>'
                    . $options .
                '</select>
            </div>
            <div>
                <label for="nb_seance">Nombre de séance(s) à créditer</label>
                <input name="nb_seance" id="nb_seance" type="number" min="0" value="0" required>
            </div>
            <button class="btn btn-success" type="submit">Mettre à jour</button>
        <form>
        ';

        
    }

    public function handle_form_submit()
    {
        // intval retourne un int si la valeur qu'on lui passe est un nombre (même sous forme de string)
        // ex : intval("3") retourne 3
        // en revanche, si on exécute cette fonction sur une chaine de caractère autre, on récupère 0
        // ex : intval("lorem ipsum") retourne 0
        $user_id = intval($_POST['user']);
        // donc ici, si on a 0, c'est qu'on n'a pas sélectionné d'utilisateur dans la liste
        // (car les id commencent à 1)
        if($user_id === 0) {
            echo '<p class="error">Veuillez sélectionner un abonné dans la liste.<p>';
            return;
        }

        // on vérifie que l'id correspond bien à un utilisateur existant
        if(!get_user_by( 'id', $user_id )) {
            echo '<p class="error">Cet utilisateur n\'existe pas.<p>';
            return;
        }

        // on vérifie que le nombre de séances est bien positif
        if($_POST['nb_seance'] < 0) {
            echo '<p class="error">Veuillez choisir un nombre de séances positif.<p>';
            return;
        }
        // ici, on a bien sélectionné un utilisateur qui existe
        // on peut donc accéder à son nombre de séance et le mettre à jour
        $old_nb_seance = get_user_meta($user_id, 'nb_seance', true);
        $new_nb_seance = $old_nb_seance + $_POST['nb_seance'];
        update_user_meta($user_id, 'nb_seance', $new_nb_seance);

        echo '<p class="success">Nombre de séances mis à jour.<p>';
    }
}
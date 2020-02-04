# Routes de l'API

- [Préambule](#pr%c3%a9ambule)
- [Page d'accueil du site](#page-daccueil-du-site)
- [Pages de pratiques](#pages-de-pratiques)
  - [Ostéopathie](#ost%c3%a9opathie)
  - [Pilates](#pilates)
- [Informations pratiques](#informations-pratiques)
- [Page d'inscription](#page-dinscription)
- [Page de connexion](#page-de-connexion)
- [Validation du bearer token](#validation-du-bearer-token)
- [Page Mon Compte](#page-mon-compte)
  - [Informations personnelles](#informations-personnelles)
  - [Mes rendez-vous](#mes-rendez-vous)
  - [Supprimer un de mes RDV](#supprimer-un-de-mes-rdv)
- [Formulaire de réservation](#formulaire-de-r%c3%a9servation)
  - [Récupération dynamique des praticiens par type de pratique](#r%c3%a9cup%c3%a9ration-dynamique-des-praticiens-par-type-de-pratique)
  - [Récupération des RDV du praticien et selon le type de pratique](#r%c3%a9cup%c3%a9ration-des-rdv-du-praticien-et-selon-le-type-de-pratique)
  - [Envoi des informations de réservation](#envoi-des-informations-de-r%c3%a9servation)

## Préambule

Toutes les urls données dans cette documentation sont à ajouter à l'url du site. Par exemple, pour le site `http://www.example.com`, on accède à l'API avec `http://www.example.com/wp-json/wp/v2/...`

## Page d'accueil du site

Pour récupérer les types de publications custom (par exemple, ostéopathie, pilates...), on peut utiliser la route `wp-json/wp/v2/types` en GET.

Cette route retourne tous les types de données de Wordpress, y compris des types natifs comme page et post.

Pour retrouver nos types custom, il faut donc filtrer les valeurs obtenus :

```json
{
    "post": {
    },
    "page": {
    },
    "attachment": {
    },
    "wp_block": {
    },
    "osteopathie": {
    },
    "pilates": {
    }
}
```

Il faut donc récupérer toutes les clés du json obtenu en réponse, sauf `post`, `page`, `attachment` et `wp_block`.

## Pages de pratiques

### Ostéopathie

Nous avons créé une taxonomie `category-osteo`. Elle regroupe 2 termes :

- `publics`
- `praticiens`

Ce sont ces termes qui permettront de différencier les contenus à afficher sur la page Ostéopathie.

Pour récupérer les id des termes, on doit utiliser la route : `wp-json/wp/v2/category-osteo` en GET.

Cette route retourne tous les termes, et leurs informations. Par exemple :

```json
[
    {
        "id": 4,
        "count": 1,
        "description": "",
        "link": "http://localhost/Apo/projet-rdv-osteo-pilates/WP/category-osteo/praticiens/",
        "name": "Praticiens",
        "slug": "praticiens",
        "taxonomy": "category-osteo",
        "parent": 0,
        "meta": [],
    },
    {
        "id": 2,
        "count": 2,
        "description": "",
        "link": "http://localhost/Apo/projet-rdv-osteo-pilates/WP/category-osteo/publics/",
        "name": "Publics",
        "slug": "publics",
        "taxonomy": "category-osteo",
        "parent": 0,
        "meta": [],
    }
]
```

Une fois qu'on a récupéré les id des différents termes, on peut faire une nouvelle requête pour afficher les posts de ce terme précis, grâce à l'url `/wp-json/wp/v2/osteopathie?category-osteo=<id>` en GET, où `<id>` est à remplacer par l'id du terme.

Cette requête retourne la liste des posts sous le format suivant :

```json
[
    {
        "id": 6,
        "date": "2020-01-22T09:21:13",
        "date_gmt": "2020-01-22T08:21:13",
        "guid": {
            "rendered": "http://localhost/Apo/projet-rdv-osteo-pilates/WP/?post_type=osteopathie&#038;p=6"
        },
        "modified": "2020-01-22T09:21:24",
        "modified_gmt": "2020-01-22T08:21:24",
        "slug": "adulte",
        "status": "publish",
        "type": "osteopathie",
        "link": "http://localhost/Apo/projet-rdv-osteo-pilates/WP/mon-osteopathie/adulte/",
        "title": {
            "rendered": "Adulte"
        },
        "content": {
            "rendered": "Lorem ipsum Dolor sit amet",
            "protected": false
        },
        "excerpt": {
            "rendered": "Lorem ipsum Dolor sit amet",
            "protected": false
        },
        "author": 1,
        "featured_media": 0,
        "template": "",
        "meta": [],
        "category-osteo": [
            2
        ],
        "thumbnail_url": false,
    },
    {
        "id": 5,
        "date": "2020-01-22T09:20:43",
        "date_gmt": "2020-01-22T08:20:43",
        "guid": {
            "rendered": "http://localhost/Apo/projet-rdv-osteo-pilates/WP/?post_type=osteopathie&#038;p=5"
        },
        "modified": "2020-01-22T10:12:14",
        "modified_gmt": "2020-01-22T09:12:14",
        "slug": "enfants-ado",
        "status": "publish",
        "type": "osteopathie",
        "link": "http://localhost/Apo/projet-rdv-osteo-pilates/WP/mon-osteopathie/enfants-ado/",
        "title": {
            "rendered": "Enfants &#038; Ado"
        },
        "content": {
            "rendered": "Lorem ipsum Dolor sit amet",
            "protected": false
        },
        "excerpt": {
            "rendered": "Lorem ipsum Dolor sit amet",
            "protected": false
        },
        "author": 1,
        "featured_media": 0,
        "template": "",
        "meta": [],
        "category-osteo": [
            2
        ],
        "thumbnail_url": false,
    }
]
```

### Pilates

Nous avons créé une taxonomie `category-pilates`. Elle regroupe 2 termes :

- `publics-pilates`
- `coach`

Ce sont ces termes qui permettront de différencier les contenus à afficher sur la page Pilates.

Pour récupérer les id des termes, on doit utiliser la route : `wp-json/wp/v2/category-pilates` en GET.

Cette route retourne tous les termes, et leurs informations. Par exemple :

```json
[
    {
        "id": 13,
        "count": 0,
        "description": "",
        "name": "Coach",
        "slug": "coach",
        "taxonomy": "category-pilates",
        "parent": 0,
        "meta": [],
    },
    {
        "id": 17,
        "count": 0,
        "description": "",
        "name": "Pour qui ?",
        "slug": "publics-pilates",
        "taxonomy": "category-pilates",
        "parent": 0,
        "meta": [],
    }
]
```

Comme pour ostéopathie, une fois qu'on a récupéré les id des différents termes, on peut faire une nouvelle requête pour afficher les posts de ce terme précis, grâce à l'url `/wp-json/wp/v2/pilates?category-pilates=<id>` en GET, où `<id>` est à remplacer par l'id du terme.

Le format de sortie est identique que pour ostéopathie.

## Informations pratiques

Les informations pratiques sont accessibles depuis l'url `/wp-json/wp/v2/info` en GET :

```json
[
    {
        "id": 13,
        "date": "2020-01-28T13:46:49",
        "date_gmt": "2020-01-28T12:46:49",
        "guid": {
            "rendered": "http://localhost/Apo/projet-rdv-osteo-pilates/WP/?post_type=info&#038;p=13"
        },
        "modified": "2020-01-28T13:46:49",
        "modified_gmt": "2020-01-28T12:46:49",
        "slug": "contact",
        "status": "publish",
        "type": "info",
        "link": "http://localhost/Apo/projet-rdv-osteo-pilates/WP/info/contact/",
        "title": {
            "rendered": "Contact"
        },
        "content": {
            "rendered": "\n<p>Informations de contact&#8230;</p>\n",
            "protected": false
        },
        "excerpt": {
            "rendered": "<p>Informations de contact&#8230;</p>\n",
            "protected": false
        },
        "featured_media": 0,
        "template": "",
        "meta": []
    },
    {
        "id": 12,
        "date": "2020-01-28T13:43:37",
        "date_gmt": "2020-01-28T12:43:37",
        "guid": {
            "rendered": "http://localhost/Apo/projet-rdv-osteo-pilates/WP/?post_type=info&#038;p=12"
        },
        "modified": "2020-01-28T13:43:37",
        "modified_gmt": "2020-01-28T12:43:37",
        "slug": "tarifs",
        "status": "publish",
        "type": "info",
        "link": "http://localhost/Apo/projet-rdv-osteo-pilates/WP/info/tarifs/",
        "title": {
            "rendered": "Tarifs"
        },
        "content": {
            "rendered": "\n<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>\n",
            "protected": false
        },
        "excerpt": {
            "rendered": "<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, [&hellip;]</p>\n",
            "protected": false
        },
        "featured_media": 0,
        "template": "",
        "meta": []
    }
]
```

## Page d'inscription

Pour inscrire un nouvel utilisateur, les données du formulaire d'inscription doivent être envoyées en **data** (Content-Type : application/json) et en **POST** via la route suivante : `/wp-json/wp/v2/users/register`. Les data doivent suivre ce format :

```json
{
  "firstname": "toto",
  "lastname": "toto",
  "phone_number": "0123456789",
  "email": "example5@local.io",
  "email_validation": "example5@local.io",
  "username": "toto",
  "password": "toto",
  "password_validation": "toto"

}
```

Lorsque la connexion est réussie on recoit cette réponse :

```json
{
    "code": 200,
    "message": "User 'toto' Registration was Successful"
}
```

Si un seul des champs est vide alors on aura une erreur et le formulaire ne sera pas soumis, l'erreur ira dans le .catch. et on aura un message de la sorte:

```json
{
    "code": 404,
    "message": "First Name field 'firstname' is required.",
    "data": {
        "status": 400
    }
}
```

Si l'utilisateur essaye de créer un compte avec la même adresse mail OU le même username alors il sera bloqué et recevra ce message :

```json
{
    "code": 406,
    "message": "Email or Username already exists.",
    "data": {
        "status": 400
    }
}
```

Si l'utilisateur essaye de créer un compte et se trompe lors de la validation du password alors il sera bloqué et recevra ce message :

```json
{
    "code": 404,
    "message": "The password confirmation does not match.",
    "data": {
        "status": 400
    }
}
```

Si l'utilisateur essaye de créer un compte et se trompe lors de la validation du password alors il sera bloqué et recevra ce message :

```json
{
    "code": 401,
    "message": "The email confirmation does not match.",
    "data": {
        "status": 400
    }
}
```

## Page de connexion

On se connecte en récupérant un Token depuis JWT à cette adresse, en **POST** : `wp-json/jwt-auth/v1/token?username=toto@example.local&password=mdp`, en remplaçant `toto@example.local`  et `mdp` par les valeurs fournies par l'utilisateur dans le formulaire de connexion.

L'API retourne alors un objet, qui contient le token, en plus de quelques informations sur l'utilisateur :

```json
{
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL0Fwb1wvcHJvamV0LXJkdi1vc3Rlby1waWxhdGVzXC9XUCIsImlhdCI6MTU3OTg1NjY5NiwibmJmIjoxNTc5ODU2Njk2LCJleHAiOjE1ODA0NjE0OTYsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.wt3R7hU2miOdJYmxU-LplrCSHqmJgnblnDSW0C7rJmU",
    "user_email": "toto@example.local",
    "user_nicename": "toto",
    "user_display_name": "toto"
}
```

En cas de mauvais mot de passe, on a cette erreur :

```json
{
    "code": "[jwt_auth] incorrect_password",
    "message": "<strong>ERREUR</strong> : ce mot de passe ne correspond pas à l’identifiant <strong>toto@example.local</strong>. <a href=\"http://localhost/Apo/projet-rdv-osteo-pilates/WP/wp/wp-login.php?action=lostpassword\">Mot de passe oublié ?</a>",
    "data": {
        "status": 403
    }
}
```

Pour le moment, pas de fonctionnalité pour réinitialiser le mot de passe.

En cas de mauvais email, on a cette erreur :

```json
{
    "code": "[jwt_auth] invalid_email",
    "message": "Adresse e-mail inconnue. Vérifiez l'orthographe ou essayez avec votre identifiant.",
    "data": {
        "status": 403
    }
}
```

## Validation du bearer token

Il est possible de stocker le token en session pour éviter de d'afficher le formulaire de connexion à chaque fois.

Il faudra alors vérifier la validité du token. Cela peut se faire sur l'url `/wp-json/jwt-auth/v1/token/validate` en **POST** et en passant le token en header.

Si le token est valide, on a la réponse suivante :

```json
{
    "code": "jwt_auth_valid_token",
    "data": {
        "status": 200
    }
}
```

Si le token est invalide, on obtient :

```json
{
    "code": "jwt_auth_invalid_token",
    "message": "Un message pouvant varier en fonction de l'erreur",
    "data": {
        "status": 403
    }
}
```

## Page Mon Compte

### Informations personnelles

Pour accéder aux informations de l'utilisateur, on va sur l'url : `/wp-json/wp/v2/users/me` et on aura besoin de passer le bearer token en header (voir [Page de connexion](#page-de-connexion) pour le récupérer).

On recoit alors la réponse suivante :

```json
{
    "id": 1,
    "name": "Zygzag",
    "url": "",
    "description": "",
    "slug": "ordv",
    "avatar_urls": {},
    "meta": {
        "first_name": "Gauthier",
        "last_name": "Dallest",
        "nb_seance": "150",
        "phone_number": "0123456789",
        "email": "fatalys34@local.net"
    }
}
```

Autrement sans bearer token l'utilisateur rencontrera cette réponse :

```json
{
    "code": "rest_not_logged_in",
    "message": "Vous n’êtes actuellement pas connecté.",
    "data": {
        "status": 401
    }
}
```

### Mes rendez-vous

Pour obtenir la liste des RDV du patient **connecté**, on doit se rendre sur l'url `wp-json/wp/v2/appointments/me` en GET et **en passant le Bearer Token**.

Si l'utilisateur a des RDV dans le futur, on renvoie un tableau qui contient un ou plusieurs objets json avec les informations de ces RDV :

```json
[
    {
        "id": "6",
        "type": "osteo",
        "start_date": "2020-02-03 10:00:00",
        "end_date": "2020-02-03 12:10:00",
        "max_places": "1",
        "available_places": "1",
        "user_id": "1",
        "created_at": "2020-01-29 11:09:08",
        "updated_at": null
    },
    {
        "id": "7",
        "type": "osteo",
        "start_date": "2020-02-04 10:00:00",
        "end_date": "2020-02-04 12:10:00",
        "max_places": "1",
        "available_places": "1",
        "user_id": "1",
        "created_at": "2020-01-29 11:09:08",
        "updated_at": null
    }
]
```

En revanche, si l'utilisateur n'a pas de RDV dans le futur, on renvoie une erreur.

Une fois l'annulation effective, on renvoie un message pour préciser que l'annulation s'est bien passée (code HTTP 200).

### Supprimer un de mes RDV

L'utilisateur peut vouloir annuler un RDV. On l'autorise uniquement si le RDV est dans plus de 48h.

Pour cela, on doit se rendre sur l'url `wp-json/wp/v2/appointments/<id>`, où on remplace `<id>` par l'id du RDV à annuler. La requête doit être avec la méthode **DELETE**, et on doit aussi envoyer le Bearer Token.

Si le RDV est dans moins de 48h, on renvoie un message d'erreur.

## Formulaire de réservation

### Récupération dynamique des praticiens par type de pratique

L'utilisateur choisit dans le formulaire le type de pratique (ostéopathie ou pilates). En fonction, il doit pouvoir choisir un praticien qui a ce rôle dans le back office.

Pour cela, on se rend sur l'url `/wp-json/wp/v2/practitioners?type=<type>` en GET, où `<type>` est à remplacer par `osteo` ou `pilates` :

En résultat, on obtient un tableau, qui contient un ou des objets json, un objet par praticien. Par exemple :

```json
[
    {
        "id": 1,
        "first_name": "Dario",
        "last_name": "Spagnolo"
    },
    {
        "id": 2,
        "first_name": "Jean",
        "last_name": "O'Clock"
    }
]
```

### Récupération des RDV du praticien et selon le type de pratique

Pour accèder aux créneaux disponibles d'un praticien et d'un type de pratique en particulier, je dois utiliser la route : `/wp-json/wp/v2/appointments?type=<type>&user_id=<id>` en GET, où `<type>` est à remplacer par `osteo` ou `pilates` et `<id>` est à remplacer par l'id du praticien.

En résultat, on obtient un tableau, qui contient un ou plusieurs objets json (un par RDV) :

```json
[
    {
        "id": "6",
        "type": "osteo",
        "start_date": "2020-02-03 10:00:00",
        "end_date": "2020-02-03 12:10:00",
        "max_places": "1",
        "available_places": "1",
        "user_id": "1",
        "created_at": "2020-01-29 11:09:08",
        "updated_at": null
    },
    {
        "id": "7",
        "type": "osteo",
        "start_date": "2020-02-04 10:00:00",
        "end_date": "2020-02-04 12:10:00",
        "max_places": "1",
        "available_places": "1",
        "user_id": "1",
        "created_at": "2020-01-29 11:09:08",
        "updated_at": null
    }
]
```

### Envoi des informations de réservation

**Le processus de réservation est réservé aux utilisateurs connectés.**

Pour créer une réservation, il faut envoyer côté serveur l'id du RDV dans un objet json, sur la route `wp-json/wp/v2/appointments` en **POST**, et avec le **Bearer Token** de l'utilisateur :

```json
{
    "appointment_id": 12
}
```

Note :

- l'id de l'utilisateur qui réserve est récupéré automatiquement grâce au Bearer Token
- si le nombre de place disponible est égal à zéro alors le rendez-vous n'est plus disponible, et on retourne un message d'erreur. Cela peut se produire si le rendez vous était visible par le current user mais qu'un autre user l'a réservé entre temps.
- si la séance est de type pilates, on s'assure que l'utilisateur a encore des séances sur sa carte. Si ce n'est pas le cas, on retourne un message d'erreur.
- si l'utilisateur a déjà réservé la séance, on retourne un message d'erreur car il ne peut pas réserver 2 fois la même séance

Si tout est ok, on renvoie simplement un objet json qui précise que la réservation s'est bien passée (code HTTP 200).

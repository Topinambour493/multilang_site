# multilang_site

Installer poetry
```
pip install poetry
```

Pour initialiser le projet avec poetry
```
cd poetry-multilang-site
poetry install
```

Remplir le .env avec vos propres variables en vous basant sur le .env-example présent dans le dossier multilang-site

Toutes les commandes suivantes sont à executer dans le dossier *poetry-multilang-site*

Pour se créer un utlisateur admin qui pourra notamment éditer des articles et traduire:
```
poetry run  python manage.py createsuperuser
```
Pour migrer les modeles dans la base de données
```
poetry run python manage.py migrate
```

Pour lancer le projet 
```
poetry run python manage.py runserver
```

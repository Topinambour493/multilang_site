# multilang_site

Installer poetry
```
pip install poetry
```

Pour initialiser le projet avec poetry
```
cd poetry-multilang-site
poetry init
```
Toutes les commandes suivantes sont à executer dans le dossier *poetry-multilang-site*

Pour se créer un utlisateur admin qui pourra notamment éditer des articles:
```
poetry run  python manage.py createsuperuser
```

Pour lancer le projet 
```
poetry run python manage.py runserver
```

Pour compiler les traductions
```
poetry run django-admin compilemessages
````
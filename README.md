# refactored-octo-robot

Тестовый проект.

## Бекенд

Код бекенда проекта находится в директории **server**.

### Разработка:
0. Скопировать **.env.template** в **.env** в корне репозитория.
0. Перейти в директорию **server**: `cd server`.
0. Скопировать **docker-compose.yml.template** в **docker-compose.yml** в директории **server**.
0. Выполнить `docker-compose up`, флаг `(-d)` для daemon-режима.
0. PostgreSQL стартанет в докере на локальном порту: **15432** по-умолчанию.
0. Указываем модуль настроек: `export DJANGO_SETTINGS_MODULE=app.settings.dev`.
0. Указываем PYTHONPATH: `export PYTHONPATH=./src`.
0. Запускаем миграции: `django-admin migrate`.
0. Для **prod** настроек нужно также собрать статику: `django-admin collectstatic`.
0. Запускаем проект: `django-admin runserver`.
0. Для запуска в **gunicorn**: `gunicorn -c src/app/gunicorn_conf.py app.wsgi`.

### Проверка кода:
0. `cd server/src`
0. **isort**: `isort`
0. **pylint**: `pylint --rcfile=.pylintrc app`
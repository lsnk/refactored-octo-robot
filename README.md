# refactored-octo-robot

Тестовый проект.

## Запуск
`./runme.sh` (нужно иметь установленный docker и docker-compose).

## Бекенд

Код бекенда проекта находится в директории **server**.

### Разработка
0. Перейти в директорию **server**: `cd server`
0. Скопировать **.env.template** в **.env**
0. Скопировать **docker-compose.yml.template** в **docker-compose.yml** в директории **server**
0. Выполнить `docker-compose up`, флаг `(-d)` для daemon-режима
0. PostgreSQL стартанет в докере на локальном порту: **15432** (по-умолчанию)
0. Указываем модуль настроек: `export DJANGO_SETTINGS_MODULE=app.settings.dev`
0. Указываем PYTHONPATH: `export PYTHONPATH=./src`
0. Запускаем миграции: `django-admin migrate`
0. Для **prod** настроек нужно также собрать статику: `django-admin collectstatic`
0. Запускаем проект: `django-admin runserver`
0. Для запуска в **gunicorn**: `gunicorn -c src/app/gunicorn_conf.py app.wsgi`

### Проверка кода

#### Локально
0. `cd server/src`
0. `export PYTHONPATH=.`
0. **isort**: `isort`
0. **pydocstyle**: `pydocstyle`
0. **pylint**: `pylint --rcfile=.pylintrc app`
0. **pytest**: `pytest`

#### В контейнере
0. `cd server`
0. `docker-compose -f docker-compose.ci.yml up`


## Фронтенд

Код SPA находится в директории **spa**.

### Разработка
0. Перейти в директорию **spa**: `cd spa`
0. `yarn install`
0. `REACT_APP_API_URL=<Путь к апи сервера> yarn start`

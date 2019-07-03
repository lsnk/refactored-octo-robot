#!/bin/sh

django-admin collectstatic --noinput && django-admin migrate --noinput
gunicorn --bind 0.0.0.0:8000 -c gunicorn_conf.py app.wsgi

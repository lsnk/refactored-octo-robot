#!/bin/sh

set -o errexit

django-admin collectstatic --noinput && django-admin migrate --noinput
gunicorn --bind 0.0.0.0:8000 -c app/gunicorn_conf.py app.wsgi

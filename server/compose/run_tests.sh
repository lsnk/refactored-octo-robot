#!/bin/sh

set -o errexit

isort --check-only
pylint --rcfile=.pylintrc app
pytest
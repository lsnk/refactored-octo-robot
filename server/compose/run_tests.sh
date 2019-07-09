#!/bin/sh

set -o errexit

isort --check-only
pydocstyle
pylint --rcfile=.pylintrc app
pytest

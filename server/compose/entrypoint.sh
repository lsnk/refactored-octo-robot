#!/bin/sh

set -o errexit
set -o pipefail

cmd="$@"

postgres_ready() {
    pg_isready -h ${POSTGRES_HOST} -p ${POSTGRES_PORT} -d ${POSTGRES_DB}
}

until postgres_ready; do
  sleep 1
done

>&2 echo "Postgres is up - continuing..."

export PYTHONPATH=${PYTHONPATH}:${PROJECT_ROOT}

exec ${cmd}

FROM python:3.7-alpine

ENV PROJECT_ROOT=/code USR_LOCAL_BIN=/usr/local/bin/
RUN mkdir $PROJECT_ROOT
WORKDIR $PROJECT_ROOT

# temp dependencies (for building python packages)
RUN apk add --no-cache --virtual .build-deps gcc libc-dev
# main dependencies
RUN apk add --no-cache postgresql-client postgresql-dev

# installing python packages
COPY ./Pipfile* $PROJECT_ROOT/
RUN pip install pipenv && pipenv install --system --deploy && apk del .build-deps

# copying scripts
COPY ./compose/*.sh $USR_LOCAL_BIN/
RUN chmod +x $USR_LOCAL_BIN/*.sh

# coping app sources
ADD ./src/app $PROJECT_ROOT/app

ENTRYPOINT ["entrypoint.sh"]

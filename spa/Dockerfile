FROM python:3.7-alpine

ENV PROJECT_ROOT=/code STATIC_DIR=/static INDEX_DIR=/index
RUN mkdir $PROJECT_ROOT && mkdir $STATIC_DIR && mkdir $INDEX_DIR

# temp dependencies
RUN apk add --no-cache --virtual .build-deps yarn

WORKDIR $PROJECT_ROOT
ADD . /code

RUN yarn install && yarn run build
RUN apk del .build-deps

CMD cp ./build/* $INDEX_DIR || cp -R ./build/static/* $STATIC_DIR

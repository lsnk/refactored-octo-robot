#!/usr/bin/env bash

echo APP SHOULD BE AVAILABLE AT: http://0.0.0.0:8787 \(API AT: http://0.0.0.0:8787/api/v1\) in a few seconds! \
&& cp -n .env.template .env \
&& sleep 3 \
&& docker-compose up

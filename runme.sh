#!/usr/bin/env bash

sleep 15 && python -mwebbrowser http://localhost:8787/api/v1 && python -mwebbrowser http://localhost:8787 &

echo APP SHOULD BE AVAILABLE AT: http://localhost:8787 \(API AT: http://localhost:8787/api/v1\) in a few seconds! \
&& cp -n .env.template .env \
&& sleep 3 \
&& docker-compose up

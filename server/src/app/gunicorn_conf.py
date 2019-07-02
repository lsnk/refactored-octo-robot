# pylint: skip-file
import multiprocessing


workers = multiprocessing.cpu_count() * 2 + 1

bind = "0.0.0.0:8000"
keepalive = 120
pidfile = 'gunicorn.pid'
worker_class = 'gevent'

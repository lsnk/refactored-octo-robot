from ._base import *


SECRET_KEY = os.getenv('SECRET_KEY')

DEBUG = False
ALLOWED_HOSTS = ['*']


# Password validation
AUTH_PASSWORD_VALIDATORS_CLASSES = (
    'UserAttributeSimilarityValidator',
    'MinimumLengthValidator',
    'CommonPasswordValidator',
    'NumericPasswordValidator'
)

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': f'django.contrib.auth.password_validation.{validator_class}'}
    for validator_class in AUTH_PASSWORD_VALIDATORS_CLASSES
]

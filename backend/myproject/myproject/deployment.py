import os
from .settings import *
from .settings import BASE_DIR

ALLOWED_HOSTS = [os.environ['WEBSITE_HOSTNAME'], '0.0.0.0']
CRSF_TRUSTED_ORIGINS = ['https://' + os.environ['WEBSITE_HOSTNAME']]

SECRET_KEY = os.environ['MY_SECRET_KEY']

DEBUG = False

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CORS_ALLOW_ALL_ORIGINS = True

STATICFILES_STORAGE = 'whitenoise.storage.CompressedStaticFilesStorage'
# maybe add manifest or other django 4.2+ settings

STATIC_URL = '/static/'
STATIC_ROOT= os.path.join(BASE_DIR,'staticfiles')
STATICFILES_DIRS = [
    'D:/home/site/wwwroot/static',
    os.path.join(BASE_DIR,'static'),
]
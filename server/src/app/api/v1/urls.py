from django.conf.urls import url
from django.urls import include
from rest_framework import routers

from .views import GroupViewSet
from .views import UserViewSet


router = routers.DefaultRouter()  # pylint: disable=C0103
router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]

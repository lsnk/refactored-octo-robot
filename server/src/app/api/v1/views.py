from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.filters import OrderingFilter

from app.groups.models import Group
from app.users.filters import UserFilter
from app.users.models import User

from .serializers import GroupSerializer
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    ordering_fields = ('id', 'first_name', 'last_name', 'state', 'created')
    ordering = ('first_name', 'last_name')
    filterset_class = UserFilter


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    ordering_fields = ('id', 'name')
    ordering = ('name',)
    filterset_fields = ('name',)

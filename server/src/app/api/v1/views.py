from django.db.models import Count
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.filters import OrderingFilter

from app.groups.models import Group
from app.users.filters import UserFilter
from app.users.models import User

from .serializers import GroupListSerializer
from .serializers import GroupSerializer
from .serializers import UserListSerializer
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):

    """User methods viewset."""

    queryset = User.objects.all()

    serializer_class = UserSerializer
    list_serializer_class = UserListSerializer

    filter_backends = (DjangoFilterBackend, OrderingFilter)
    ordering_fields = ('id', 'first_name', 'last_name', 'state', 'created')
    ordering = ('first_name', 'last_name')
    filterset_class = UserFilter

    def get_serializer_class(self):
        """Return special serializer for `list` method."""
        if self.action == 'list':
            return self.list_serializer_class

        return super().get_serializer_class()


class GroupViewSet(viewsets.ModelViewSet):

    """Group methods viewset."""

    queryset = Group.objects.all()

    serializer_class = GroupSerializer
    list_serializer_class = GroupListSerializer

    filter_backends = (DjangoFilterBackend, OrderingFilter)
    ordering_fields = ('id', 'name')
    ordering = ('name',)
    filterset_fields = ('name',)

    def get_queryset(self):
        """Annotate queryset with `total_members`."""
        queryset = super().get_queryset()
        if self.action == 'list':
            queryset = queryset.annotate(total_members=Count('members'))

        return queryset

    def get_serializer_class(self):
        """Return special serializer for `list` method."""
        if self.action == 'list':
            return self.list_serializer_class

        return super().get_serializer_class()

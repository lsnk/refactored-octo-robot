from rest_framework import serializers

from app.groups.models import Group
from app.users.models import User


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'name', 'members')

    members = serializers.PrimaryKeyRelatedField(
        many=True,
        read_only=False,
        queryset=User.objects.all(),
        allow_empty=True,
    )


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id', 'first_name', 'last_name', 'email', 'state', 'created',
            'groups'
        )

    groups = serializers.PrimaryKeyRelatedField(
        many=True,
        read_only=False,
        queryset=Group.objects.all(),
        allow_empty=True,
    )

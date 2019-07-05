from rest_framework import serializers

from app.groups.models import Group
from app.users.models import User


class GroupListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'name', 'total_members')

    total_members = serializers.IntegerField(read_only=True)


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id', 'first_name', 'last_name', 'email', 'state', 'created',
            'groups'
        )

    groups = serializers.StringRelatedField(
        many=True,
        read_only=True,
    )


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'name', 'members', 'members_list')

    # for reading members
    members_list = UserListSerializer(source='members', many=True, read_only=True)

    # for writing members
    members = serializers.PrimaryKeyRelatedField(
        many=True,
        write_only=True,
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

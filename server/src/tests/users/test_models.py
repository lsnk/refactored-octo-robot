from django.core.exceptions import ValidationError
from django.db import IntegrityError
import pytest

from tests.groups.factories import GroupFactory
from tests.users.factories import UserFactory


class TestUsers:

    @pytest.mark.django_db
    def test_new_user(self):
        """Tests new user creation."""
        user = UserFactory()
        assert user.groups.count() == 0

    @pytest.mark.django_db
    def test_email_validation(self):
        """Tests email verification."""
        user = UserFactory(email='invalid_email')
        with pytest.raises(ValidationError):
            user.full_clean()

    @pytest.mark.django_db
    def test_state_validation(self):
        """Tests state verification."""
        user = UserFactory(state='wrong_state')
        with pytest.raises(ValidationError):
            user.full_clean()

    @pytest.mark.django_db
    def test_email_duplicates(self):
        """Tests duplicate emails."""
        user = UserFactory()
        with pytest.raises(IntegrityError):
            UserFactory(email=user.email)


class TestGroupMembership:

    @pytest.mark.django_db
    def test_user_groups(self):
        user = UserFactory()
        assert user.groups.count() == 0

        group1 = GroupFactory()
        group2 = GroupFactory()
        user.groups.add(group1, group2)
        assert user.groups.count() == 2

        user.groups.add(group1)
        assert user.groups.count() == 2

        user.groups.remove(group1)
        assert user.groups.count() == 1

    @pytest.mark.django_db
    def test_group_members(self):
        group = GroupFactory()
        assert group.members.count() == 0

        user1 = UserFactory()
        user2 = UserFactory()
        group.members.add(user1, user2)
        assert group.members.count() == 2

        group.members.add(user1)
        assert group.members.count() == 2

        group.members.remove(user1)
        assert group.members.count() == 1

import pytest

from tests.groups.factories import GroupFactory


class TestGroups:

    @pytest.mark.django_db
    def test_new_group(self):
        """Tests new group creation."""
        group = GroupFactory()

        assert group.members.count() == 0

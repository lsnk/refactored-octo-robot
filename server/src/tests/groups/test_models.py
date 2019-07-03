import pytest

from tests.groups.factories import GroupFactory


@pytest.mark.django_db
class TestGroups:

    def test_new_group(self):
        """Tests new group creation."""
        group = GroupFactory()

        assert group.members.count() == 0

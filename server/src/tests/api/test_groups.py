from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
import pytest

from app.users.enums import UserState
from tests.groups.factories import GroupFactory
from tests.users.factories import UserFactory


@pytest.mark.django_db
class BaseTestGroupsViewSet(APITestCase):

    list_url = reverse('group-list')


class TestEmptyGroupsViewSet(BaseTestGroupsViewSet):

    def test_empty_groups_list(self):
        response = self.client.get(self.list_url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.json()) == 0

    def test_new_group(self):
        group_name = 'group_name'
        response = self.client.post(self.list_url, {'name': group_name})
        assert response.status_code == status.HTTP_201_CREATED

        response = self.client.get(self.list_url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.json()) == 1
        assert response.json()[0]['name'] == group_name


class TestExistingGroupsViewSet(BaseTestGroupsViewSet):

    @classmethod
    @pytest.fixture(autouse=True, scope='class')
    def _existing_group(cls):
        group = GroupFactory()
        cls.existing_group = group
        cls.detail_url = reverse('group-detail', args=[group.id])

    def test_delete_group(self):
        response = self.client.delete(self.detail_url)
        assert response.status_code == status.HTTP_204_NO_CONTENT

        response = self.client.get(self.list_url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.json()) == 0

    def test_patch_group(self):
        group_new_name = 'new_name'
        response = self.client.patch(self.detail_url, {'name': group_new_name})
        assert response.status_code == status.HTTP_200_OK

        response = self.client.get(self.detail_url)
        assert response.status_code == status.HTTP_200_OK
        assert response.json()['name'] == group_new_name

    def test_group_members(self):
        response = self.client.get(self.detail_url)
        assert response.status_code == status.HTTP_200_OK
        assert response.json()['members_list'] == []

        members_ids = [UserFactory().id, UserFactory().id]
        response = self.client.patch(
            self.detail_url, {'members': members_ids}
        )
        assert response.status_code == status.HTTP_200_OK

        response = self.client.get(self.detail_url)
        assert response.status_code == status.HTTP_200_OK
        assert (
            set(m['id'] for m in response.json()['members_list'])
            == set(members_ids)
        )


@pytest.mark.django_db
class BaseTestUserViewSet(APITestCase):

    list_url = reverse('user-list')

    user_params = {
        'first_name': 'FirstName',
        'last_name': 'LastName',
        'email': 'email@example.com',
        'state': UserState.ACTIVE.value,
    }


class TestUsersViewSet(BaseTestUserViewSet):

    def test_empty_users_list(self):
        response = self.client.get(self.list_url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.json()) == 0

    def test_new_user(self):
        response = self.client.post(self.list_url, self.user_params)
        assert response.status_code == status.HTTP_201_CREATED

        response = self.client.get(self.list_url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.json()) == 1

    def test_email_validation(self):
        user_params = dict(**self.user_params)
        user_params['email'] = 'bad_email'
        response = self.client.post(self.list_url, user_params)
        assert response.status_code == status.HTTP_400_BAD_REQUEST


class TestExistingUsersViewSet(BaseTestUserViewSet):

    @classmethod
    @pytest.fixture(autouse=True, scope='class')
    def _existing_user(cls):
        user = UserFactory()
        cls.existing_user = user
        cls.detail_url = reverse('user-detail', args=[user.id])

    def test_delete_user(self):
        response = self.client.delete(self.detail_url)
        assert response.status_code == status.HTTP_204_NO_CONTENT

        response = self.client.get(self.list_url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.json()) == 0

    def test_patch_user(self):
        response = self.client.patch(self.detail_url, self.user_params)
        assert response.status_code == status.HTTP_200_OK

        response = self.client.get(self.detail_url)
        assert response.status_code == status.HTTP_200_OK
        for param_name, param_value in self.user_params.items():
            assert response.json()[param_name] == param_value

    def test_group_membership(self):
        response = self.client.get(self.detail_url)
        assert response.status_code == status.HTTP_200_OK
        assert response.json()['groups'] == []

        group_ids = [GroupFactory().id, GroupFactory().id]
        response = self.client.patch(
            self.detail_url, {'groups': group_ids}
        )
        assert response.status_code == status.HTTP_200_OK

        response = self.client.get(self.detail_url)
        assert response.status_code == status.HTTP_200_OK
        assert set(response.json()['groups']) == set(group_ids)

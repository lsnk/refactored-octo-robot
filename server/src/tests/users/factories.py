import factory

from app.users.enums import UserState
from app.users.models import User


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    first_name = factory.Sequence(lambda n: 'first_name_%d' % n)
    last_name = factory.Sequence(lambda n: 'last_name_%d' % n)
    email = factory.Sequence(lambda n: '%d@example.com' % n)
    state = UserState.ACTIVE

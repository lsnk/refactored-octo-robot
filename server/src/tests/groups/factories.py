import factory

from app.groups.models import Group


class GroupFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Group

    name = factory.Sequence(lambda n: 'group_%d' % n)

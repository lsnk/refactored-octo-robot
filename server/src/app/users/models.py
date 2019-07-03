from django.db import models

from .enums import UserState


class User(models.Model):
    first_name = models.CharField('First name', max_length=128, db_index=True)
    last_name = models.CharField('Last name', max_length=128, db_index=True)
    email = models.EmailField('Email', unique=True, db_index=True)
    state = models.CharField(
        'State',
        max_length=32,
        choices=UserState.choices(),
    )
    created = models.DateTimeField('Created at', auto_now_add=True)

    groups = models.ManyToManyField(
        'groups.Group',
        through='GroupMembership',
        related_name='members',
    )

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class GroupMembership(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey('groups.Group', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user} in {self.group}'

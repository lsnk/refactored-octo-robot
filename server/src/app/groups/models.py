from django.db import models


class Group(models.Model):

    """Group model."""

    name = models.CharField('Name', max_length=128, unique=True, db_index=True)

    def __str__(self):
        return self.name

import django_filters

from .models import User


class UserFilter(django_filters.FilterSet):
    class Meta:
        model = User
        fields = {
            'created': ['gt', 'lt', 'year__exact'],
            'state': ['exact'],
            'first_name': ['exact', 'istartswith'],
            'last_name': ['exact', 'istartswith'],
        }

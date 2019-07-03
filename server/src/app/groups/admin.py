from django.contrib import admin

from .models import Group


@admin.register(Group)
class GroupAdmin(admin.ModelAdmin):
    list_display = ('name', 'members_display')

    @classmethod
    def members_display(cls, obj):
        return ', '.join([str(m) for m in obj.members.all()])

    members_display.short_description = "Members"

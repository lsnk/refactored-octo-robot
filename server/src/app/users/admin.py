from django.contrib import admin

from app.users.models import GroupMembership

from .models import User


class GroupMembershipInline(admin.StackedInline):
    model = GroupMembership
    extra = 1


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    inlines = [GroupMembershipInline]

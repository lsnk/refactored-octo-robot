from app.helpers import ChoicesEnum


class UserState(ChoicesEnum):
    ACTIVE = 'active'
    INACTIVE = 'inactive'

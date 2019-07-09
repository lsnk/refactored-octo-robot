from app.helpers import ChoicesEnum


class UserState(ChoicesEnum):

    """User states."""

    ACTIVE = 'active'
    INACTIVE = 'inactive'

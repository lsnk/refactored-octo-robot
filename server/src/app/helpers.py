from enum import Enum


class ChoicesEnum(Enum):

    """Allows to use python Enums as Django choices."""

    @classmethod
    def choices(cls):
        """Return choices for Django."""
        return tuple((i.value, i.name) for i in cls)

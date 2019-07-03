from enum import Enum


class ChoicesEnum(Enum):
    @classmethod
    def choices(cls):
        return tuple((i.value, i.name) for i in cls)

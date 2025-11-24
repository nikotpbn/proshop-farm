from beanie import Document, Indexed

from models.shared import Timestamp


class User(Document):
    name: Indexed(str, unique=True)
    email: str
    password: str
    is_admin: bool = False
    timestamp: Timestamp = Timestamp()
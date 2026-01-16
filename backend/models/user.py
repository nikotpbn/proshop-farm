from pydantic import BaseModel
from beanie import Document, Indexed

from models.shared import Timestamp


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class User(Document):
    username: Indexed(str, unique=True)
    first_name: str
    last_name: str | None = None
    email: Indexed(str, unique=True)
    password: str
    is_admin: bool = False
    timestamp: Timestamp = Timestamp()

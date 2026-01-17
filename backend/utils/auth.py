from typing import Union

import os
import jwt
from jwt.exceptions import InvalidTokenError
from pwdlib import PasswordHash

from fastapi.security import OAuth2PasswordBearer

from datetime import timedelta, timezone, datetime

from models.user import User, UserProfile

SECRET_KEY = os.environ.get("SECRET_KEY", None)
ALGORITHM = "HS256"


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
password_hash = PasswordHash.recommended()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return password_hash.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return password_hash.hash(password)


async def authenticate_user(username: str, password: str):
    user = await User.find_one(User.username == username)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user


def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            return None

    except InvalidTokenError:
        return None

    user = await User.find_one(User.username == username).project(UserProfile)
    if user is None:
        return None

    return user

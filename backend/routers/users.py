from typing import Annotated


from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.exceptions import HTTPException

from pymongo.errors import DuplicateKeyError


from models.product import User
from utils.users import get_password_hash

router = APIRouter(
    prefix="/api/v1/users",
    tags=["auth"],
    responses={404: {"description": "Not found"}},
)


"""
Public Acess
"""


@router.post("/register")
async def user_register(user: User):
    try:
        # Hashpassword
        user.password = get_password_hash(user.password)
        result = await user.create()

    except Exception as e:
        print(e._message)
        return JSONResponse(
            {"error": "User could not be created (probably a duplicate)"}, 500
        )

    return f"User {User.username} created"


@router.post("/login")
async def user_login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
):
    token = None
    return token


"""
Get User Profile
Private Acess
"""


@router.get("/profile")
async def get_user_profile():
    return "User Profile"


@router.patch("/profile")
async def update_user_profile():
    return "Update User Profile"


@router.get("/logout")
async def user_logout():
    return "User Logout"


"""
Get User Profile
Private Acess
Restricted to Admin
"""


@router.get("/")
async def list_users():
    return "User Profile"


@router.get("/{user_id}")
async def get_user():
    return "User Profile"


@router.patch("/{user_id}")
async def update_users():
    return "User Profile"


@router.delete("/{user_id}")
async def delete_users():
    return "User Profile"

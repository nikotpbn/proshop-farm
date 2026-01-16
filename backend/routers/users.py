from datetime import timedelta

from typing import Annotated

from fastapi import APIRouter, Depends, Cookie
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm

from models.product import User
from utils.auth import get_password_hash, authenticate_user, create_access_token

router = APIRouter(
    prefix="/api/v1/users",
    tags=["auth"],
    responses={404: {"description": "Not found"}},
)

ACCESS_TOKEN_EXPIRE_MINUTES = 30

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

    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        return JSONResponse("User not found", status_code=404)

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )

    response = JSONResponse("User logged in", status_code=200)
    response.set_cookie(key="access", value=access_token, httponly=True)

    return response


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
    response = JSONResponse({"message": "User logged out"}, status_code=200)
    response.delete_cookie("access")

    return response


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

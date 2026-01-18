from utils.auth import get_password_hash

users = [
    {
        "username": "admin",
        "first_name": "admin",
        "email": "admin@example.com",
        "password": get_password_hash("admin123"),
        "isAdmin": True,
    },
    {
        "username": "jdoe",
        "first_name": "Jonh",
        "last_name": "Doe",
        "email": "jdoe@example.com",
        "password": get_password_hash("pass123"),
        "isAdmin": False,
    },
    {
        "username": "mjane",
        "first_name": "Mary",
        "last_name": "Jane",
        "email": "mjane@example.com",
        "password": get_password_hash("pass123"),
        "isAdmin": False,
    },
]

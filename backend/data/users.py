import bcrypt

users = [
    {
        "username": "admin",
        "first_name": "admin",
        "email": "admin@example.com",
        "password": bcrypt.hashpw(b"admin123", bcrypt.gensalt()),
        "isAdmin": True,
    },
    {
        "username": "jdoe",
        "first_name": "Jonh",
        "last_name": "Doe",
        "email": "jdoe@example.com",
        "password": bcrypt.hashpw(b"pass123", bcrypt.gensalt()),
        "isAdmin": False,
    },
    {
        "username": "mjane",
        "first_name": "Mary",
        "last_name": "Jane",
        "email": "mjane@example.com",
        "password": bcrypt.hashpw(b"pass123", bcrypt.gensalt()),
        "isAdmin": False,
    },
]

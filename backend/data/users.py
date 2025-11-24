import bcrypt

users = [
    {
        "name": "admin",
        "email": "admin@example.com",
        "password": bcrypt.hashpw(b"adminpass", bcrypt.gensalt()),
        "isAdmin": True,
    },
    {
        "name": "John Doe",
        "email": "jdoe@example.com",
        "password": bcrypt.hashpw(b"adminpass", bcrypt.gensalt()),
        "isAdmin": False,
    },
    {
        "name": "Mary Jane",
        "email": "mjane@example.com",
        "password": bcrypt.hashpw(b"adminpass", bcrypt.gensalt()),
        "isAdmin": False,
    },
]

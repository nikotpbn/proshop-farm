import os

from pymongo import AsyncMongoClient
from beanie import init_beanie

from models.user import User
from models.order import Order
from models.product import Product


async def connect_to_mongo():
    try:
        # Create Async PyMongo client
        client = await AsyncMongoClient(os.environ["MONGO_URI"])
        print("Connected to the database")
        await init_beanie(
            database=client.db_name, document_models=[Product, User, Order]
        )

    except Exception as e:
        print("Error initializing database:", e)

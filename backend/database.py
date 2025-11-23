import os
from models import Product
from pymongo import AsyncMongoClient
from beanie import init_beanie


# Call this from within your event loop to get beanie setup.
async def connect_to_mongo():
    try:
        # Create Async PyMongo client
        client = await AsyncMongoClient(os.environ["MONGO_URI"])
        print("Connected to the database")
        await init_beanie(database=client.db_name, document_models=[Product])

    except Exception as e:
        print("Error initializing database:", e)

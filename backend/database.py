import os
import certifi
from rich import print

from pymongo import AsyncMongoClient
from beanie import init_beanie


async def init_db():
    client = AsyncMongoClient(os.environ["MONGO_URI"], tlsCAFile=certifi.where())
    print("[bold green]Connected to the database.[/bold green]")
    await init_beanie(
        database=client.db_name,
        document_models=[
            "models.user.User",
            "models.order.Order",
            "models.product.Product",
        ],
    )

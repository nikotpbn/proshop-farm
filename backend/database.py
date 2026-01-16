import os
import redis
import certifi

from rich import print

from pymongo import AsyncMongoClient
from beanie import init_beanie


REDIS = None


async def init_db():
    client = AsyncMongoClient(os.environ["MONGO_URI"], tlsCAFile=certifi.where())

    await init_beanie(
        database=client.db_name,
        document_models=[
            "models.user.User",
            "models.order.Order",
            "models.product.Product",
            "models.cart_item.CartItem",
        ],
    )

    print("[bold green]\tConnected to MongoDB.[/bold green]")


async def init_cache():
    global REDIS

    REDIS = redis.Redis(
        host=os.environ["REDIS_HOST"],
        port=17264,
        decode_responses=True,
        username="default",
        password=os.environ["REDIS_PASSWORD"],
    )

    print("[bold green]\tConnected to Redis.[/bold green]")


def get_redis_conn():
    return REDIS

import os
import certifi

from rich import print
from dotenv import load_dotenv

from beanie import init_beanie
from pymongo import AsyncMongoClient

from models.user import User
from models.product import Product

from data.users import users as users_seed
from data.products import products as products_seed

load_dotenv()


async def connect_to_mongo():
    try:
        # Create Async PyMongo client
        client = AsyncMongoClient(os.environ["MONGO_URI"], tlsCAFile=certifi.where())
        print("Connected to the database")
        await init_beanie(database=client.db_name, document_models=[Product, User])

    except Exception as e:
        print("Error initializing database:", e)


async def create():
    try:
        print("[bold green]Starting data import...[/bold green]")

        await Product.delete_all()
        await User.delete_all()

        print("[yellow]Existing data cleared.[/yellow]")

        user_docs = [User(**user) for user in users_seed]
        await User.insert_many(user_docs)

        admin_user = await User.find_one(User.username == "admin")

        product_docs = []

        for product in products_seed:
            product["user"] = admin_user
            product_docs.append(Product(**product))

        await Product.insert_many(product_docs)

        print("[bold green]Data import completed successfully![/bold green]")
    except Exception as e:
        print(f"[bold red]Error:[/bold red] {e}")


async def destroy():
    try:
        await Product.delete_all()
        await User.delete_all()
        print("[bold red]Data destroyed successfully![/bold red]")

    except Exception as e:
        print(e)


if __name__ == "__main__":
    import asyncio
    import sys

    async def main():
        await connect_to_mongo()

        if len(sys.argv) > 1 and sys.argv[1] == "-d":
            await destroy()
        else:
            await create()

    asyncio.run(main())

from dotenv import load_dotenv
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models.product import Product

from database import init_db


async def lifespan(app: FastAPI):
    await init_db()
    yield


app = FastAPI(lifespan=lifespan)
load_dotenv()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/api/v1/products")
async def product_list():
    return await Product.find().to_list()


@app.get("/api/v1/products/{product_id}")
async def product_detail(product_id: str):
    product = await Product.get(product_id)
    if product:
        return product

    return {"error": "Product not found"}, 404

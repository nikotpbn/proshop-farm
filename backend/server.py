from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from products import products

app = FastAPI()

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


@app.get("/api/products")
def product_list():
    return products


@app.get("/api/products/{product_id}")
async def product_detail(product_id: str):
    product = next((item for item in products if item["_id"] == product_id), None)
    if product:
        return product

    return {"error": "Product not found"}, 404

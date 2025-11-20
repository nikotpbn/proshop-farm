from fastapi import FastAPI

from products import products

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/api/products")
def product_list():
    return {"products": products}


@app.get("/api/products/{product_id}")
async def product_detail(product_id: str):
    product = next((item for item in products if item["_id"] == product_id), None)
    if product:
        return product

    return {"error": "Product not found"}, 404

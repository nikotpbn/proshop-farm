from fastapi import APIRouter


from models.product import Product

router = APIRouter(
    prefix="/api/v1/products",
    tags=["products"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
async def product_list():
    return await Product.find().to_list()


@router.get("/{product_id}")
async def product_detail(product_id: str):
    product = await Product.get(product_id)
    if product:
        return product

    return {"error": "Product not found"}, 404

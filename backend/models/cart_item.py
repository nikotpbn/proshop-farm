from beanie import Document
from pydantic import BaseModel

from models.user import User


class UpdateSerializer(BaseModel):
    id: str
    qty: int


class CartItem(Document):
    user: User | None = None
    id: str
    name: str
    image: str
    price: float
    qty: int
    count_in_stock: int | None = None

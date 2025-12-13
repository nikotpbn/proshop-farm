from typing import Optional
from beanie import Document, Indexed, DecimalAnnotation

from models.user import User


class CartItem(Document):
    user: User | None = None
    id: str
    name: str
    image: str
    price: float
    qty: int

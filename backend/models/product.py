from typing import Optional
from beanie import Document, Indexed
from bson.decimal128 import Decimal128
from bson.objectid import ObjectId

from shared import Timestamp

from backend.models.user import User


class Review(Document):
    user: User
    name: str
    rating: float
    comment: str
    timestamp: Timestamp = Timestamp()


class Product(Document):
    user: User
    name: str
    image: str
    brand: Indexed(str)
    category: str
    description: str
    reviews: list[Review] = []
    rating: float
    numReviews: int = 0
    price: Indexed(Decimal128) = 0
    count_in_stock: int = 0
    timestamp: Timestamp = Timestamp()

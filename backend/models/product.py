from beanie import Document, Indexed, DecimalAnnotation

from models.user import User
from models.shared import Timestamp


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
    price: DecimalAnnotation = 0
    count_in_stock: int = 0
    timestamp: Timestamp = Timestamp()

from datetime import date
from typing import Optional
from beanie import Document
from bson.decimal128 import Decimal128
from bson.objectid import ObjectId

from shared import Timestamp
from backend.models.user import User
from backend.models.product import Product


class OrderItem(Document):
    name: str
    qty: int
    image: str
    price: str
    product: Product


class ShippingAddress(Document):
    address: str
    city: str
    postal_code: str
    country: str


class PaymentResult(Document):
    id: str
    status: str
    update_time: str
    email_address: str


class Order(Document):
    user: User
    order_items: list[OrderItem]
    shipping_address: ShippingAddress
    payment_method: str
    payment_result: Optional[PaymentResult] = None
    items_price: Decimal128 = 0
    tax_price: Decimal128 = 0
    shipping_price: Decimal128 = 0
    total_price: Decimal128 = 0
    is_paid: bool = False
    paid_at: Optional[str] = None
    is_delivered: bool = False
    delivered_at: Optional[date] = None
    timestamp: Timestamp = Timestamp()

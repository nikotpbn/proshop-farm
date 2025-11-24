from datetime import date
from typing import Optional
from beanie import Document, DecimalAnnotation

from models.user import User
from models.product import Product
from models.shared import Timestamp


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
    items_price: DecimalAnnotation = 0
    tax_price: DecimalAnnotation = 0
    shipping_price: DecimalAnnotation = 0
    total_price: DecimalAnnotation = 0
    is_paid: bool = False
    paid_at: Optional[str] = None
    is_delivered: bool = False
    delivered_at: Optional[date] = None
    timestamp: Timestamp = Timestamp()

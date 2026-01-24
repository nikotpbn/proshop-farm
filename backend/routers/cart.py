import uuid
from calendar import timegm
from datetime import datetime, timedelta, timezone
from typing import Annotated

from fastapi import APIRouter, Request, Cookie, status
from fastapi.responses import JSONResponse, Response


from database import get_redis_conn

from models.cart_item import CartItem, UpdateSerializer

router = APIRouter(
    prefix="/api/v1/cart",
    tags=["cart"],
)


@router.get("/")
async def get_cart(
    cart_session: Annotated[uuid.UUID | None, Cookie()] = None,
):
    if not cart_session:
        return Response(status_code=status.HTTP_204_NO_CONTENT)
    try:
        r = get_redis_conn()
        data = r.json().get(f"cart:{cart_session}", "$")[0]
        return data

    except Exception as e:
        return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.post("/add")
async def add_item(
    cart_item: CartItem,
    cart_session: Annotated[uuid.UUID | None, Cookie()] = None,
):
    r = get_redis_conn()

    # If there is no cart session in cookies
    # Create a cookie with the cart session id
    # Create a cart add the item
    if not cart_session:
        cart_session = uuid.uuid4()
        try:
            items_price = cart_item.qty * cart_item.price
            shipping_price = 0 if items_price > 100 else 10
            tax_price = 0.15 * items_price
            expires_delta = timedelta(hours=6)
            expire = datetime.now(timezone.utc) + expires_delta
            # Convert datetime to a intDate value in known time-format claims
            expires_in = timegm(expire.utctimetuple())

            data = {
                "cartItems": [
                    {
                        "id": cart_item.id,
                        "name": cart_item.name,
                        "price": cart_item.price,
                        "image": cart_item.image,
                        "qty": cart_item.qty,
                        "countInStock": cart_item.count_in_stock,
                    }
                ],
                "itemsPrice": items_price,
                "taxPrice": tax_price,
                "shippingPrice": shipping_price,
                "totalPrice": items_price + shipping_price + tax_price,
                "expiresIn": expires_in,
            }

            r.json().set(f"cart:{cart_session}", "$", data)
            # Set an automatic expirations
            # Should be in sync with cookie
            # (avoids a task to clear the cache onunused sessions)
            # 21600 = 6h -> 60s * 60m * 6h
            r.expire(f"cart:{cart_session}", 21600)

            content = {"msg": "Cart session created, item was added", "cart": data}
            response = JSONResponse(content=content)
            response.set_cookie(
                key="cart_session",
                value=cart_session,
                expires=expires_delta,
                httponly=True,
            )

            return response

        except Exception as e:
            print(e)
            content = {"msg": "Something went wrong"}
            return JSONResponse(content=content)
    else:
        # If there is a cart session in cookies
        # Retrieve the cart from cache
        try:
            data = r.json().get(f"cart:{cart_session}", "$")[0]

            item = [item for item in data["cartItems"] if item["id"] == cart_item.id]

            if item:
                # If item to be added is present, then update item
                item[0]["qty"] += cart_item.qty
            else:
                # If item to be added is not present, then add item
                data["cartItems"].append(
                    {
                        "id": cart_item.id,
                        "name": cart_item.name,
                        "image": cart_item.image,
                        "price": cart_item.price,
                        "qty": cart_item.qty,
                        "countInStock": cart_item.count_in_stock,
                    }
                )

            # Recalculate totals
            data["itemsPrice"] = sum(
                [item["price"] * item["qty"] for item in data["cartItems"]]
            )
            data["taxPrice"] = 0 if data["itemsPrice"] > 100 else 10
            data["shippingPrice"] = 0.15 * data["itemsPrice"]
            data["totalPrice"] = (
                data["itemsPrice"] + data["taxPrice"] + data["shippingPrice"]
            )

            # Reset cart
            r.json().set(f"cart:{cart_session}", "$", data)

            content = {
                "msg": "Cart updated, item was added",
                "cart": data,
            }
            return JSONResponse(content=content)
        except Exception as e:
            content = {"msg": "Something went wrong"}
            return JSONResponse(content=content)


@router.patch("/update")
async def update_remove_item(
    request: Request,
    cart_item: UpdateSerializer,
    cart_session: Annotated[uuid.UUID | None, Cookie()] = None,
):
    if not cart_session:
        content = {"msg": "Cart not found"}
        return JSONResponse(content=content)

    try:
        r = get_redis_conn()
        data = r.json().get(f"cart:{cart_session}", "$")[0]

        cart = data["cartItems"]
        index, item = [
            (i, cart[i]) for i in range(len(cart)) if cart[i]["id"] == cart_item.id
        ][0]

        if item:
            # Remove entire product
            if cart_item.qty <= 0:
                data["cartItems"].pop(index)
                r.json().set(f"cart:{cart_session}", "$", data)
                content = {"msg": "Item successfully removed", "cart": data}
                return JSONResponse(content=content)

            # Replace quantity
            else:
                item["qty"] = cart_item.qty

            # Recalculate totals
            data["itemsPrice"] = sum(
                [item["price"] * item["qty"] for item in data["cartItems"]]
            )
            data["taxPrice"] = 0 if data["itemsPrice"] > 100 else 10
            data["shippingPrice"] = 0.15 * data["itemsPrice"]
            data["totalPrice"] = (
                data["itemsPrice"] + data["taxPrice"] + data["shippingPrice"]
            )

            r.json().set(f"cart:{cart_session}", "$", data)
            content = {"msg": "Item updated", "cart": data}
            return JSONResponse(content=content)

        else:
            content = {"msg": "Item not found in cart"}
            return JSONResponse(content=content, status_code=status.HTTP_204_NO_CONTENT)

    except Exception as e:
        print(e)
        content = {"msg": "Something went wrong"}
        return JSONResponse(
            content=content, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

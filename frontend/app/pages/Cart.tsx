import type { Route } from "./+types/Cart";

import { Link, useFetcher, redirect } from "react-router";
import { Button } from "~/components/ui/button";

import { CART_URL } from "~/constants";

import { cartContext } from "~/context";

import Loader from "~/components/Loader";
import Message from "../components/Message";

export async function clientLoader({ context }: Route.LoaderArgs) {
  const cart = context.get(cartContext);
  return cart;
}

export async function clientAction({
  request,
  context,
}: Route.ClientActionArgs) {
  const formData = await request.formData();
  let cart = null;
  let update = formData.get("update");
  let qty = formData.get("qty") as string;
  let id = formData.get("id") as string;

  if (update && qty) {
    cart = await updateCartItem(qty, id);
  } else {
    cart = await updateCartItem("0", id);
  }

  context.set(cartContext, cart);
}

export function HydrateFallback() {
  return <Loader />;
}

async function updateCartItem(qty: string, id: string) {
  try {
    const res = await fetch(`${CART_URL}/update/`, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify({ qty, id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      const data = await res.json();
      localStorage.setItem("cart", JSON.stringify(data.cart));
      return data.cart;
    }
  } catch (error) {}
}

const Cart = ({ loaderData }: Route.ComponentProps) => {
  const cart = loaderData;
  let fetcher = useFetcher();

  if (!cart) {
    return (
      <Message variant="info">
        Your cart is empty, <Link to="/">Go back.</Link>
      </Message>
    );
  }

  if (cart && cart.cartItems.length === 0) {
    return (
      <Message variant="info">
        Your cart is empty, <Link to="/">Go back.</Link>
      </Message>
    );
  }

  return (
    <div className="flex gap-4 md:flex-nowrap flex-wrap">
      <div className="flex-col w-full md:w-[70%]">
        <div className="text-3xl font-bold antialiased">Shopping Cart</div>
        {cart &&
          cart.cartItems.map((item: any) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row m-2 items-center gap-4"
            >
              <img className="w-full sm:w-1/4 " src={item.image} alt="" />
              <div>{item.name}</div>
              <fetcher.Form method="PATCH">
                <input type="hidden" name="update" value="update" />
                <input type="hidden" name="id" value={item.id} />
                <select
                  name="qty"
                  className="border w-full border-white-500"
                  defaultValue={item.qty}
                  onChange={(event) => {
                    fetcher.submit(event.currentTarget.form);
                    redirect("/cart");
                  }}
                >
                  {Array.from({ length: item.countInStock }, (v, i) => (
                    <option key={i}>{i + 1}</option>
                  ))}
                </select>
              </fetcher.Form>
              <fetcher.Form method="PATCH">
                <input type="hidden" name="id" value={item.id} />
                <button
                  onClick={(event) => {
                    fetcher.submit(event.currentTarget.form);
                    redirect("/cart");
                  }}
                >
                  <span className="material-icons">delete</span>
                </button>
              </fetcher.Form>
            </div>
          ))}
      </div>
      <div className="flex-col w-full md:w-[30%]">
        <div className="border h-min">
          <div className="p-2 text-nowrap">
            <div className="text-xl font-semibold mb-2">
              Subtotal (
              {cart.cartItems
                .map((item: any) => item.qty)
                .reduce((sum: number, qty: number) => {
                  return sum + qty;
                })}
              ) items
            </div>
            <div className="text-sm font-semibold">${cart.totalPrice}</div>
          </div>

          <hr />

          <div className="flex p-2 justify-center">
            <Button className="bg-yellow-500 hover:bg-yellow-500 text-white">
              <Link to="/shipping">Proceed to Checkout</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

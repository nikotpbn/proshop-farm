import type { Route } from "./+types/ProductDetail";
import type { ProductType } from "~/models/ProductType";
import { Form } from "react-router";

import { Link } from "react-router";

import Rating from "~/components/Rating";
import Loader from "~/components/Loader";
import Message from "~/components/Message";

import { PRODUCTS_URL, CART_URL } from "~/constants";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const res = await fetch(`${PRODUCTS_URL}${params.productId}`);
  const product = (await res.json()) as ProductType;
  return product;
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);

  const res = await fetch(`${CART_URL}/add/`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  localStorage.setItem("cart", JSON.stringify(data.cart));
}

export function HydrateFallback() {
  return <Loader />;
}

const ProductDetail = ({ loaderData }: Route.ComponentProps) => {
  const product = loaderData;

  if (!product) {
    return <Message variant="danger">Could not find product</Message>;
  } else {
    return (
      <>
        <button className="m-4 p-2 rounded-md hover:text-black hover:bg-white border border-white-500">
          <Link to="/" className="btn btn-light my-3">
            Go Back
          </Link>
        </button>

        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex w-full sm:w-[40%]">
            <img
              src={product.image}
              alt="Image"
              className="rounded-md object-cover max-h-max"
            />
          </div>

          <div className="flex justify-center w-full sm:w-[30%]">
            <div className="flex flex-col">
              <span>
                <strong>{product.name}</strong>
              </span>
              <hr className="mt-2 mb-2" />
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
              <hr className="mt-2 mb-2" />
              <div>Price: ${product.price}</div>
              <hr className="mt-2 mb-2" />
              <div>{product.description}</div>
            </div>
          </div>

          <div className="flex justify-center w-full sm:w-[30%]">
            <div className="border rounded-md w-full max-h-max">
              <div className="flex justify-between py-3 px-2">
                <span>Price:</span>
                <span>{`$${product.price}`}</span>
              </div>
              <hr />
              <div className="flex justify-between py-3 px-2">
                <span>Status:</span>
                <span>
                  {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              <hr />

              <Form method="post" className="flex flex-col items-center py-2">
                <div className="flex justify-between w-full py-3 px-2">
                  <span>Qty:</span>
                  <span className="w-[40%]">
                    <select
                      name="qty"
                      id=""
                      className="border w-full border-white-500"
                    >
                      {Array.from({ length: product.countInStock }, (v, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </span>
                </div>

                <input type="hidden" name="id" value={product._id} />
                <input type="hidden" name="name" value={product.name} />
                <input type="hidden" name="image" value={product.image} />
                <input type="hidden" name="price" value={product.price} />
                <input
                  type="hidden"
                  name="count_in_stock"
                  value={product.countInStock}
                />
                <button
                  disabled={product.countInStock === 0}
                  className="flex w-[90%] justify-center p-2 rounded-md hover:text-black hover:bg-white border border-white-500"
                >
                  Add to Cart
                </button>
              </Form>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default ProductDetail;

import type { Route } from "./+types/ProductDetail";
import { Link } from "react-router";

import Rating from "~/components/Rating";

import type { ProductType } from "~/models/ProductType";

import products from "../src/products";

const ProductDetail = ({ params }: Route.ComponentProps) => {
  const product = products.find((p: ProductType) => p._id === params.productId);

  if (product) {
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
              <h3>{product.name}</h3>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
              <div>Price: ${product.price}</div>
              <div>{product.description}</div>
            </div>
          </div>

          <div className="flex justify-center w-full sm:w-[30%]">
            <div className="border rounded-md w-full">
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
              <span className="flex justify-center">
                <button
                  disabled={product.countInStock === 0}
                  className="w-[90%] p-2 rounded-md hover:text-black hover:bg-white border border-white-500"
                >
                  Add to Cart
                </button>
              </span>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default ProductDetail;

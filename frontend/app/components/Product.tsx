import { Link } from "react-router";

import type { ProductType } from "~/models/ProductType";

import Rating from "./Rating";

const Product = ({ product }: { product: ProductType }) => {
  return (
    <div className="flex flex-col border border-solid shadow-xs shadow-white my-3 p-3 rounded-md w-auto">
      <Link to={`/product/${product._id}`}>
        <img className="rounded-xs" src={product.image} alt="" />
      </Link>

      <Link to={`/product/${product._id}`} className="text-xs mt-2 mb-2">
        <strong>{product.name}</strong>
      </Link>

      <Rating value={product.rating} text={`${product.numReviews} Reviews`} />

      <div className="flex flex-col text-xl mt-2 mb-2">
        <span className="">${product.price}</span>
      </div>
    </div>
  );
};

export default Product;

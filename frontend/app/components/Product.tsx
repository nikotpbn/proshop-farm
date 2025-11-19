import { Link } from "react-router";

interface ProductType {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}

const Product = ({ product }: { product: ProductType }) => {
  return (
    <div className="flex flex-col border border-solid shadow-xs shadow-white my-3 p-3 rounded-md w-auto">
      <Link to={`/product/${product._id}`}>
        <img className="rounded-xs" src={product.image} alt="" />
      </Link>

      <Link to={`/product/${product._id}`} className="text-xs mt-2 mb-2">
        <strong>{product.name}</strong>
      </Link>

      <div className="flex-1 flex-col content-end  text-xl mt-2 mb-2">
        <span className="">${product.price}</span>
      </div>
    </div>
  );
};

export default Product;

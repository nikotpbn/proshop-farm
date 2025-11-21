import type { Route } from "./+types/Landing";
import type { ProductType } from "~/models/ProductType";

import Product from "~/components/Product";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ProShop" },
    { name: "description", content: "Browse our latest products." },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const res = await fetch(`http://localhost:8000/api/products/`);
  const products = await res.json();
  return products;
}

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return <div>Loading...</div>;
}

const Landing = ({ loaderData }: Route.ComponentProps) => {
  const products = loaderData;

  return (
    <>
      <div className="mt-3 mb-3 text-3xl font-bold">Latest Products</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products &&
          products.map((product: ProductType) => (
            <Product key={product._id} product={product} />
          ))}
      </div>
    </>
  );
};

export default Landing;

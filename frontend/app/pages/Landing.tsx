import type { Route } from "./+types/Landing";
import type { ProductType } from "~/models/ProductType";

import { useGetProductsQuery } from "~/slices/productsApiSlice";

import Product from "~/components/Product";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ProShop" },
    { name: "description", content: "Browse our latest products." },
  ];
}

const Landing = ({ loaderData }: Route.ComponentProps) => {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products.</div>;
  }

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

import type { Route } from "./+types/Landing";
import type { ProductType } from "~/models/ProductType";

import Product from "~/components/Product";
import Loader from "~/components/Loader";
import Message from "~/components/Message";

import { PRODUCTS_URL } from "~/constants";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ProShop" },
    { name: "description", content: "Browse our latest products." },
  ];
}

export async function clientLoader() {
  try {
    const res = await fetch(`${PRODUCTS_URL}`);
    const products = (await res.json()) as ProductType[];
    return products;
  } catch (error) {
    console.log(error);
  }
}

export function HydrateFallback() {
  return <Loader />;
}

const Landing = ({ loaderData }: Route.ComponentProps) => {
  const products = loaderData as ProductType[] | undefined;

  if (!products) {
    return <Message variant="danger">Could not fetch products</Message>;
  } else {
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
  }
};

export default Landing;

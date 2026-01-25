import { redirect } from "react-router";

import type { Route } from "./+types/Shipping";

import ShippingForm from "~/components/ShippingForm";

import { userContext } from "~/context";

export async function clientLoader({ context }: Route.LoaderArgs) {
  const user = context.get(userContext);
  console.log(user);
  if (!user) {
    return redirect("/signin");
  }
}

export async function clientAction({ request }: Route.ClientActionArgs) {}

const Shipping = () => {
  return <ShippingForm />;
};

export default Shipping;

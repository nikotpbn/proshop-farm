import { redirect } from "react-router";

import type { Route } from "./+types/Shipping";

import ShippingForm from "~/components/ShippingForm";
import CheckoutSteps from "~/components/CheckoutSteps";

import { userContext } from "~/context";

export async function clientLoader({ context }: Route.LoaderArgs) {
  const user = context.get(userContext);

  if (!user) {
    return redirect("/signin");
  }
}

export async function clientAction({ request }: Route.ClientActionArgs) {}

const Shipping = () => {
  return (
    <>
      <CheckoutSteps
        signin={true}
        shipping={true}
        payment={false}
        placeOrder={false}
      />
      <ShippingForm />
    </>
  );
};

export default Shipping;

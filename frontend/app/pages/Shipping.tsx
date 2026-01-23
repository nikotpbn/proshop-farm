import type { Route } from "./+types/Shipping";

import ShippingForm from "~/components/ShippingForm";

export async function clientAction({ request }: Route.ClientActionArgs) {}

const Shipping = () => {
  return <ShippingForm />;
};

export default Shipping;

import { Form } from "react-router";

import { Button } from "./ui/button";

import FormInput from "./FormInput";

const ShippingForm = () => {
  return (
    <div className="flex justify-center">
      <Form className="flex flex-col w-[70%]">
        <h1 className="text-3xl font-semibold mb-4">Shipping</h1>
        <FormInput
          label="Address"
          type="text"
          name="address"
          placeholder="Enter address"
        />
        <FormInput
          label="City"
          type="text"
          name="city"
          placeholder="Enter city"
        />
        <FormInput
          label="Postal Code"
          type="text"
          name="zip_code"
          placeholder="Enter postal code"
        />
        <FormInput
          label="Country"
          type="text"
          name="country"
          placeholder="Enter country"
        />
        <Button type="submit">Continue</Button>
      </Form>
    </div>
  );
};

export default ShippingForm;

import { Form } from "react-router";

import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

import CheckoutSteps from "~/components/CheckoutSteps";

const Payment = () => {
  return (
    <>
      <CheckoutSteps
        signin={true}
        shipping={true}
        payment={true}
        placeOrder={false}
      />
      <div className="flex justify-center">
        <Form className="flex flex-col w-[70%]">
          <h1 className="text-3xl font-semibold mb-4">PaymentMethod</h1>
          <h1 className="text-xl mb-4">Select Method</h1>
          <RadioGroup defaultValue="comfortable" className="w-fit mb-4">
            <div className="flex items-center gap-3">
              <RadioGroupItem value="comfortable" id="r1" />
              <Label htmlFor="r1">PayPal or Credit Card</Label>
            </div>
          </RadioGroup>
          <Button className="w-[20%]">Continue</Button>
        </Form>
      </div>
    </>
  );
};

export default Payment;

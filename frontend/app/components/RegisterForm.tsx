import { Form, Link } from "react-router";

import { Button } from "~/components/ui/button";

import FormInput from "~/components/FormInput";

function RegisterForm() {
  return (
    <div className="flex w-full justify-center items-center">
      <Form className="flex flex-col w-full sm:w-[50%]" method="post">
        <h1 className="text-2xl font-bold mb-2">Register</h1>
        <FormInput
          name="username"
          type="text"
          placeholder="Enter username"
          label="Username *"
          autoComplete="username"
        />
        <FormInput
          name="first_name"
          type="text"
          placeholder="First Name"
          label="First Name *"
          autoComplete="given-name"
        />
        <FormInput
          name="last_name"
          type="text"
          placeholder="Last Name"
          label="Last Name"
          autoComplete="family-name"
        />
        <FormInput
          name="email"
          type="text"
          placeholder="Enter Email"
          label="Email *"
          autoComplete="email"
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          label="Password *"
          autoComplete="current-password"
        />
        <FormInput
          name="password2"
          type="password"
          placeholder="Confirm Password"
          label="Confirm Password *"
          autoComplete="current-password"
        />
        <Button>Sign In</Button>
        <p className="text-xs mt-5">
          <span>Already have an account?</span>
          <Link className="underline" to="/signin">
            Login
          </Link>
        </p>
      </Form>
    </div>
  );
}

export default RegisterForm;

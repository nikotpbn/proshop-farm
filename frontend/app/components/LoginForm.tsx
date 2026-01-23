import { Form, Link } from "react-router";

import { Button } from "~/components/ui/button";

import FormInput from "~/components/FormInput";

function LoginForm() {
  return (
    <div className="flex w-full justify-center items-center">
      <Form className="flex flex-col w-full sm:w-[50%]" method="post">
        <h1 className="text-2xl font-bold mb-2">Sign In</h1>
        <FormInput
          name="username"
          type="text"
          placeholder="Enter username"
          label="Username"
          autoComplete="username"
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Enter password"
          label="Password"
          autoComplete="current-password"
        />
        <Button>Sign In</Button>
        <p className="text-xs mt-5">
          <span>New Customer?</span> <Link className="underline" to="/register">Register</Link>
        </p>
      </Form>
    </div>
  );
}

export default LoginForm;

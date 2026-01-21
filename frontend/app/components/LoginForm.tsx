import { Form } from "react-router";

import FormInput from "~/components/FormInput";

function LoginForm() {
  return (
    <div className="flex w-full justify-center items-center">
      <Form className="flex flex-col w-[50%]" method="post">
        <h1 className="text-2xl font-bold mb-2">Sign In</h1>
        <FormInput
          name="username"
          type="text"
          placeholder="Enter username"
          label="Email Address"
          autoComplete="username"
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Enter password"
          label="Password"
          autoComplete="current-password"
        />
        <button className="bg-gray-300 hover:bg-white text-black rounded-md my-2 cursor-pointer">
          Sign In
        </button>
        <p className="text-xs">
          New Customer? <a href="/register">Register</a>
        </p>
      </Form>
    </div>
  );
}

export default LoginForm;

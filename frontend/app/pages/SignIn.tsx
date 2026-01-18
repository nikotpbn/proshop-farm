import type { Route } from "./+types/SignIn";

import { Form, redirect } from "react-router";
import { USERS_URL } from "~/constants";

import { userContext } from "~/context";

export async function clientLoader({ context }: Route.LoaderArgs) {
  const user = context.get(userContext);
  if (user) {
    throw redirect("/");
  }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();

  try {
    const res = await fetch(`${USERS_URL}/login/`, {
      credentials: "include",
      method: "POST",
      body: formData,
    });

    if (res.status === 200) {
      const data = await res.json();
      console.log(data.message);
    }
  } catch (error) {
    console.log("something went wrong");
  }
}

function SignIn() {
  return (
    <div>
      <Form className="flex flex-col" method="post">
        <input
          name="username"
          type="text"
          placeholder="username"
          autoComplete="username"
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          autoComplete="current-password"
        />
        <button>Login</button>
      </Form>
    </div>
  );
}

export default SignIn;

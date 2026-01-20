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

    // User is authenticated
    if (res.status === 200) {
      const res = await fetch(`${USERS_URL}/profile/`, {
        credentials: "include",
      });

      // Set user profile in local storage
      if (res.status === 200) {
        const user = await res.json();
        user.accessExpires = Date.now() + 30 * 60 * 1000; // 30 minutes
        localStorage.setItem("user", JSON.stringify(user));
        return redirect("/");
      }
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

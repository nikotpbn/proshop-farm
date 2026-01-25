import type { Route } from "./+types/SignIn";

import { redirect } from "react-router";

import LoginForm from "~/components/LoginForm";

import { USERS_URL } from "~/constants";
import { userContext } from "~/context";

import { toast } from "sonner";

export async function clientLoader({ context }: Route.LoaderArgs) {
  const user = context.get(userContext);
  if (user) {
    return redirect("/");
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
    // Invalid credentials
    toast.error("Login Failed", {
      position: "top-right",
      description: "Invalid credentials (username or password).",
    });
  } catch (error) {
    console.log("something went wrong");
  }
}

function SignIn() {
  return <LoginForm />;
}

export default SignIn;

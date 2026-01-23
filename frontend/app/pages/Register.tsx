import type { Route } from "./+types/Register";

import RegisterForm from "~/components/RegisterForm";

import { toast } from "sonner";
import { USERS_URL } from "~/constants";
import { redirect } from "react-router";

export async function clientAction({ request }: Route.ClientActionArgs) {
  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const formData = await request.formData();

  const password = formData.get("password");
  const password2 = formData.get("password2");

  const username = formData.get("username");
  const email = formData.get("email");
  const first_name = formData.get("first_name");
  const last_name = formData.get("last_name");

  // Basic validation
  if (!username || !email || !password || !password2 || !first_name) {
    toast.error("Missing required fields", {
      position: "top-right",
      description: "Please fill in all required fields.",
    });
    return;
  }

  if (!regex.test(email.toString())) {
    toast.error("Invalid email format", {
      position: "top-right",
      description: "Please enter a valid email address.",
    });
    return;
  }

  if (password !== password2) {
    toast.error("Passwords do not match", {
      position: "top-right",
      description: "Please make sure both passwords are the same.",
    });
    return;
  }

  try {
    const payload = {
      username,
      first_name,
      email,
      password,
    };

    if (last_name) {
      Object.assign(payload, { last_name: last_name });
    }

    const response = await fetch(`${USERS_URL}/register`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      toast.success("Registration successful!", {
        position: "top-right",
        description: "You can now log in with your new account.",
      });
      redirect("/signin");
    } else {
      const data = await response.json();
      toast.error("Registration failed", {
        position: "top-right",
        description: data.message || "An error occurred during registration.",
      });
    }
  } catch (error) {}
}

function Register() {
  return <RegisterForm />;
}

export default Register;

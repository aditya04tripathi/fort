"use server";

import type { TResponseLogin } from "@/types";
import { cookies } from "next/headers";

export async function loginAction(
  usernameOrEmail: string = "testuser",
  password: string = "testpassword"
) {
  const response = await fetch(`${process.env.API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      usernameOrEmail,
      password,
    }),
  });
  const json = (await response.json()) as TResponseLogin;

  if (!json.okay || !json.message) {
    throw new Error("Login failed");
  }

  const cookieStore = await cookies();
  cookieStore.set("token", json.message.token, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });

  return {
    user: json.message.user,
    token: json.message.token,
  };
}

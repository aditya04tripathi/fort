"use server";

import type { TResponseLogin } from "@/types";
import { cookies } from "next/headers";

export async function signInAction({
  usernameOrEmail,
  password,
}: {
  usernameOrEmail: string;
  password: string;
}) {
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
    throw new Error(json.error ?? "Failed to sign in. Please try again.");
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

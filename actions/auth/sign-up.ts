"use server";

import type { TResponseLogin } from "@/types";
import { cookies } from "next/headers";

export async function signUpAction({
  fullName,
  email,
  username,
  password,
  isPrivate,
}: {
  fullName: string;
  email: string;
  username: string;
  password: string;
  isPrivate: boolean;
}) {
  const response = await fetch(`${process.env.API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullName,
      email,
      username,
      password,
      isPrivate,
    }),
  });
  const json = (await response.json()) as TResponseLogin;

  if (!json.okay || !json.message) {
    throw new Error(json.error || "Failed to sign up. Please try again.");
  }

  console.log(json.message);

  const cookieStore = await cookies();
  cookieStore.set("token", json.message.token, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });

  return json.message;
}

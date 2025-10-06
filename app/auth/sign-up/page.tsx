import React from "react";
import SignUpPageClient from "./page-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://menmattertoo.space"),
  title: "Sign Up",
  description: "Sign up to your Fortress account to join the brotherhood.",
  openGraph: {
    title: "Sign Up | Fortress",
    description: "Sign up to your Fortress account to join the brotherhood.",
  },
  twitter: {
    title: "Sign Up | Fortress",
    description: "Sign up to your Fortress account to join the brotherhood.",
  },
};

const SignUpPage = () => {
  return (
    <div className="flex flex-col items-stretch w-full gap-6">
      <div className="flex flex-col items-center w-full gap-2 lg:items-start">
        <h1 className="text-center lg:text-left">Join the brotherhood 👑</h1>
        <p className="text-sm text-center lg:text-left text-muted-foreground">
          Sign up to create your secure and private space. Your data is
          protected with us.
        </p>
      </div>

      <SignUpPageClient />
    </div>
  );
};

export default SignUpPage;

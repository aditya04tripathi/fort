import React from "react";
import SignInPageClient from "./page-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_URL || "https://menmattertoo.space"
  ),
  title: "Sign In",
  description: "Sign in to your Fortress account to continue your journey.",
  openGraph: {
    title: "Sign In | Fortress",
    description: "Sign in to your Fortress account to continue your journey.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign In | Fortress",
    description: "Sign in to your Fortress account to continue your journey.",
    creator: "@adityatripathi",
  },
};

const SignInPage = () => {
  return (
    <div className="flex flex-col items-stretch w-full gap-6">
      <div className="flex flex-col items-center w-full gap-2 lg:items-start">
        <h1 className="text-center lg:text-left">Welcome back your grace 👑</h1>
        <p className="text-sm text-center lg:text-left text-muted-foreground">
          Sign in to access your secure and private space. Your data is
          protected with us.
        </p>
      </div>

      <SignInPageClient />
    </div>
  );
};

export default SignInPage;

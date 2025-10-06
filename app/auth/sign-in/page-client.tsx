"use client";

import { signInAction } from "@/actions/auth/sign-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const SignInPageClient = () => {
  const [form, setForm] = useState({
    email: "adityatripathi",
    password: "1234567890",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signInAction({
        usernameOrEmail: form.email,
        password: form.password,
      });
    } catch (error) {
      return toast.error(`Error signing in. Please try again.`, {
        description: (error as Error).message,
      });
    }

    return toast.success("Signed in successfully!", {
      description: "Welcome back! You have successfully signed in.",
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2.5 items-stretch"
      >
        <div className="flex flex-col items-stretch justify-start gap-1">
          <Label htmlFor="email">Enter your email or username</Label>
          <Input
            id="email"
            type="text"
            placeholder="adityatripathi"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col items-stretch justify-start gap-1">
          <Label htmlFor="password">Enter your password</Label>
          <Input
            id="password"
            type="password"
            placeholder="•••••••••••"
            value={form.password}
            onChange={handleChange}
          />
        </div>
      </form>

      <div className="flex lg:flex-row flex-col items-center justify-between gap-2.5 w-full">
        <Button type="submit" className="w-full lg:flex-1">
          Sign In
        </Button>
        <Button
          onClick={() => router.push("/auth/sign-up")}
          type="button"
          className="w-full lg:flex-1"
          variant={"link"}
        >
          No account? Register here!
        </Button>
      </div>
    </>
  );
};

export default SignInPageClient;

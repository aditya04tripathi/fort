"use client";

import { signUpAction } from "@/actions/auth/sign-up";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const SignUpPageClient = () => {
  const [form, setForm] = React.useState({
    fullName: "Aditya Tripathi",
    username: "adityatripathi",
    email: "adityatripathi.at04@gmail.com",
    password: "1234567890",
    isPrivate: true,
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUpAction({
        fullName: form.fullName,
        username: form.username,
        email: form.email,
        password: form.password,
        isPrivate: form.isPrivate,
      });
    } catch (error) {
      return toast.error(`Error signing up. Please try again.`, {
        description: (error as Error).message,
      });
    }

    return toast.success("Signed up successfully!", {
      description: "You can now sign in to your account.",
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2.5 items-stretch"
      >
        <div className="flex flex-col items-stretch justify-start gap-1">
          <Label htmlFor="name">Enter your name</Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={form.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col items-stretch justify-start gap-1">
          <Label htmlFor="username">Enter your username</Label>
          <Input
            id="username"
            type="text"
            placeholder="johndoe"
            value={form.username}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col items-stretch justify-start gap-1">
          <Label htmlFor="email">Enter your email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@doe.com"
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
        <div className="flex items-center justify-end gap-2">
          <Checkbox
            checked={form.isPrivate}
            id="isPrivate"
            onCheckedChange={(checked) =>
              setForm((prev) => ({ ...prev, isPrivate: checked as boolean }))
            }
          />
          <Label htmlFor="isPrivate">Keep my profile private</Label>
        </div>
      </form>

      <div className="flex lg:flex-row flex-col items-center justify-between gap-2.5 w-full">
        <Button type="submit" className="w-full lg:flex-1">
          Sign Up
        </Button>
        <Button
          onClick={() => router.push("/auth/sign-in")}
          type="button"
          className="w-full lg:flex-1"
          variant={"link"}
        >
          Have an account? Sign In here!
        </Button>
      </div>
    </>
  );
};

export default SignUpPageClient;

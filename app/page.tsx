import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="container mx-auto w-full h-screen flex flex-col gap-5 items-center justify-center">
      <Logo className="max-h-52 w-auto" />
      <h1>
        Welcome to{" "}
        <span className="text-primary-foreground bg-primary p-2">Fortress</span>
      </h1>

      <p className="text-center text-muted-foreground">
        Fort is a social media platform that allows men to connect, share
        experiences, and support each other in a safe and empowering
        environment. The platform is designed to foster positive masculinity,
        mental health awareness, and community engagement through various
        features such as posts, comments, and user profiles. This is achieved
        through anonimity, robust moderation, and a focus on constructive
        interactions.
      </p>

      <Link href="/auth/sign-up">
        <Button className="w-full md:w-auto">Sign Up To Get Started!</Button>
      </Link>
    </div>
  );
}

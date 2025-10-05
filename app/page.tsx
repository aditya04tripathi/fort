import React, { Suspense } from "react";
import LoadingComponent from "@/components/loading-component";
import { loginAction } from "@/actions/auth/login";
import { Button } from "@/components/ui/button";

async function handleTestLogin() {
  "use server";

  try {
    const result = await loginAction("testuser", "testpassword");
    console.log("Login successful:", result);
  } catch (error) {
    console.error("Login failed:", error);
  }
}

export default function Home() {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h1>WIP on Fort</h1>

        <form action={handleTestLogin} className="mt-4">
          <Button type="submit">Test Login</Button>
        </form>
      </div>
    </Suspense>
  );
}

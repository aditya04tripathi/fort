import React, { Suspense } from "react";
import LoadingComponent from "@/components/loading-component";

export default function Home() {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <div className="w-full h-screen flex items-center justify-center">
        <h1>WIP on Fortress!</h1>
      </div>
    </Suspense>
  );
}

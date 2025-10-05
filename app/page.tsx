import LoadingComponent from "@/components/loading-component";
import React, { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <div className="w-full h-screen flex items-center justify-center">
        <h1>WIP on Fortress!</h1>
      </div>
    </Suspense>
  );
}

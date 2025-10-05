import LoadingComponent from "@/components/loading-component";
import React, { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <h1>Hello World</h1>
    </Suspense>
  );
}

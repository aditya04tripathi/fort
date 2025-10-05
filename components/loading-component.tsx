import React from "react";
import { Loader2 } from "lucide-react";

const LoadingComponent = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen bg-background text-foreground z-50">
      <div className="flex w-full h-full items-center justify-center">
        <Loader2 className="size-12 animate-spin text-primary" />
      </div>
    </div>
  );
};

export default LoadingComponent;

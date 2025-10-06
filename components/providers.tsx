"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type React from "react";
import { Suspense } from "react";
import { Toaster } from "sonner";
import LoadingComponent from "@/components/loading-component";

const queryClient = new QueryClient();
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster
          duration={2500}
          closeButton
          richColors
          theme="dark"
          className="select-none"
        />
      </QueryClientProvider>
    </Suspense>
  );
};

export default Providers;

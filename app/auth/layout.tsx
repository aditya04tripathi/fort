import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }: { children: Readonly<React.ReactNode> }) => {
  return (
    <div className="container mx-auto flex h-screen w-full items-center justify-center">
      <div className="w-[80%] h-[90%] bg-background border-2 rounded overflow-clip flex items-center justify-between">
        <div className="relative hidden lg:block flex-1 h-full">
          <Image
            className="w-1/2 object-cover"
            src="https://picsum.photos/1080"
            alt="Auth Illustration"
            fill
          />
        </div>
        <div className="w-full lg:w-1/2 p-5 flex justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

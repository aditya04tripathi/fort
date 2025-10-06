import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_URL || "https://menmattertoo.space"
  ),
  icons: "/favicon.ico",
  manifest: "/site.webmanifest",
  title: {
    default: "Fort",
    template: "%s | Fort",
  },
  description:
    "Fort is a social media platform that allows men to connect, share experiences, and support each other in a safe and empowering environment. The platform is designed to foster positive masculinity, mental health awareness, and community engagement through various features such as posts, comments, and user profiles. This is achieved through anonimity, robust moderation, and a focus on constructive interactions.",
  authors: [
    {
      name: "Aditya Tripathi",
    },
  ],
  creator: "Aditya Tripathi",
  keywords: ["fort", "mental health", "anonymous"],
  openGraph: {
    type: "website",
    url: process.env.NEXT_PUBLIC_URL || "https://menmattertoo.space",
    title: "Fort | A Safe Space",
    description:
      "Fort is a social media platform that allows men to connect, share experiences, and support each other in a safe and empowering environment. The platform is designed to foster positive masculinity, mental health awareness, and community engagement through various features such as posts, comments, and user profiles. This is achieved through anonimity, robust moderation, and a focus on constructive interactions.",
    siteName: "Fort",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fort | A Safe Space",
    description:
      "Fort is a social media platform that allows men to connect, share experiences, and support each other in a safe and empowering environment. The platform is designed to foster positive masculinity, mental health awareness, and community engagement through various features such as posts, comments, and user profiles. This is achieved through anonimity, robust moderation, and a focus on constructive interactions.",
    creator: "@adityatripathi",
  },
};

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

import type { Metadata } from "next";
import { Merriweather, Montserrat, Space_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import LoadingComponent from "@/components/loading-component";
import Providers from "@/components/providers";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
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
    images: "/opengraph-image.png",
    title: "Fort | A Safe Space",
    description:
      "Fort is a social media platform that allows men to connect, share experiences, and support each other in a safe and empowering environment. The platform is designed to foster positive masculinity, mental health awareness, and community engagement through various features such as posts, comments, and user profiles. This is achieved through anonimity, robust moderation, and a focus on constructive interactions.",
    url: "https://menmattertoo.space",
    siteName: "Fort",
    locale: "en-AU",
    type: "website",
    countryName: "Australia",
    emails: ["adityatripathi.at04@gmail.com"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${merriweather.variable} ${spaceMono.variable} antialiased`}
      >
        <Suspense fallback={<LoadingComponent />}>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}

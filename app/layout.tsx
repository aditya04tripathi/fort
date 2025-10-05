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
    "A safe-space for men to talk about their mental health anonymously.",
  authors: [
    {
      name: "Aditya Tripathi",
    },
  ],
  creator: "Aditya Tripathi",
  keywords: ["fort", "mental health", "anonymous"],
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

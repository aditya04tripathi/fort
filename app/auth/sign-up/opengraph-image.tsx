import OgAndTwitterImage from "@/components/og-and-twitter-image";
import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  return new ImageResponse(
    <OgAndTwitterImage title="Sign Up" subtitle="Join the brotherhood 👑" />
  );
}

import React from "react";
import Logo from "./logo";

const OgAndTwitterImage = ({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) => {
  return (
    <div
      style={{ display: "flex" }}
      className="items-center justify-center w-full h-screen max-h-screen"
    >
      <div
        style={{ display: "flex" }}
        className="relative items-center justify-center w-full h-full"
      >
        <div
          style={{ display: "flex" }}
          className="z-10 flex-col items-center justify-center w-full gap-5 py-10 bg-accent"
        >
          <h1 className="text-8xl">{title}</h1>
          <h3>{subtitle}</h3>
        </div>
        <Logo className="fixed h-full py-10 -translate-x-1/2 opacity-40 left-1/2" />
      </div>
    </div>
  );
};

export default OgAndTwitterImage;

import React from "react";

const OgAndTwitterImage = ({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        maxHeight: "100vh",
        gap: "1rem",
      }}
    >
      <div
        style={{
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          gap: "1.25rem",
          paddingTop: "2.5rem",
          paddingBottom: "2.5rem",
          backgroundColor: "#388e3c",
        }}
      >
        <div style={{ display: "flex" }}>
          <h1
            style={{
              fontSize: "6rem",
              fontFamily: "Merriweather, serif",
              fontWeight: 900,
              color: "#f0ebe5",
            }}
          >
            {title}
          </h1>
        </div>
        <div style={{ display: "flex" }}>
          <h3
            style={{
              fontSize: "1.875rem",
              fontFamily: "Merriweather, serif",
              fontWeight: 900,
              color: "#f0ebe5",
            }}
          >
            {subtitle}
          </h3>
        </div>
      </div>
      <svg
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 343.44 479.04"
        style={{
          fill: "#4caf50",
          stroke: "none",
          strokeWidth: 0,
          position: "absolute",
          height: "100%",
          paddingTop: "2.5rem",
          paddingBottom: "2.5rem",
          transform: "translateX(-50%)",
          opacity: 0.4,
          left: "50%",
        }}
      >
        <polygon points="280.89 90.94 280.89 112.42 265.04 112.42 265.04 90.94 249.6 90.94 249.6 112.22 233.12 112.22 233.12 16.48 213.31 16.48 213.31 41.09 189.74 41.09 189.74 0 183.27 0 160.17 0 153.71 0 153.71 41.09 130.14 41.09 130.14 16.48 110.32 16.48 110.32 112.22 93.84 112.22 93.84 90.94 78.41 90.94 78.41 112.42 62.56 112.42 62.56 90.94 43.58 90.94 43.58 279.29 97.39 324.97 97.39 161.49 115.85 161.49 115.85 342.7 160.17 380.45 160.17 99.08 183.27 99.08 183.27 380.45 227.6 342.7 227.6 161.49 246.06 161.49 246.06 324.97 299.87 279.29 299.87 90.94 280.89 90.94"></polygon>
        <polygon
          style={{ fill: "#4caf50", stroke: "none", strokeWidth: 0 }}
          points="343.44 335.15 213.61 443.93 171.72 479.04 129.82 443.93 0 335.15 34.56 293.89 171.72 408.82 308.88 293.89 343.44 335.15"
        ></polygon>
      </svg>
    </div>
  );
};

export default OgAndTwitterImage;

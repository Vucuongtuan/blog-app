"use client";
import React, { useEffect, useState } from "react";

export default function LayoutDetail({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrolled, setScrolled] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolledPercentage = (scrollPx / winHeightPx) * 100;
      setScrolled(scrolledPercentage);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {" "}
      <div
        className="progress-container"
        style={{
          background: "#6b6b6b",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
          height: "5px",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          zIndex: 99,
        }}
      >
        <div
          className="progress-bar"
          style={{
            height: "5px",
            background: "#619dff",
            width: `${scrolled}%`,
          }}
        />
      </div>
      {children}
    </>
  );
}

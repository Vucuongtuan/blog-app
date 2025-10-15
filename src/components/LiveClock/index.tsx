"use client";
import React, { useState, useEffect } from "react";

const LiveClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedDate = currentTime.toLocaleString("vi-VN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = currentTime.toLocaleString("vi-VN", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  return (
    <div className="h-full ">
      <div className=" leading-6 text-center text-sm text-[#989898]">
        {formattedDate}
      </div>
      <p className="text-center">
        <span>{formattedTime}</span>
      </p>
    </div>
  );
};

export default LiveClock;

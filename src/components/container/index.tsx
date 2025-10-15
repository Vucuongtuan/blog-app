import React from "react";

type PropsContainer = {
  children: React.ReactNode;
};

const Container = ({ children }: PropsContainer) => {
  return (
    <div className="container mx-auto xl:px-28 h-full w-full max-w-[2500px] m-auto ">
      {children}
    </div>
  );
};

export default Container;

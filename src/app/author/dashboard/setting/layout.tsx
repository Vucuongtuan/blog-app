import React from "react";
import SideBar from "./sideBar";

export default function LayoutSettingDash({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="px-2">
        <div className="title p-4">
          <h1 className="text-3xl ">Cài đặt</h1>
          <span className="text-[#6b6b6b] ">
            Quản lý cài đặt tài khoản của bạn và đặt tùy chọn
          </span>
        </div>
      </div>
      <div className="flex space-x-2 px-6">
        <SideBar />
        {children}
      </div>
    </>
  );
}

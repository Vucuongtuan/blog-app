"use client";
import { ChatProvider } from "@/components/chatGroup/context";
import { ContextSocket } from "../provider";
import ChatGroup from "@/components/chatGroup";
import { useContext } from "react";
import BtnJoinGroup from "./btnJoinGroup";

export default function CommunityClient() {
  const context = useContext(ContextSocket);
  //check user join group
  if (context === true) {
    return (
      <section className="px-1 h-[85vh] ">
        <ChatProvider>
          <h1 className="text-3xl font-semibold">
            {/* Cộng đồng sáng tạo nội dung */}
          </h1>
          <ChatGroup />
        </ChatProvider>
      </section>
    );
  }
  return (
    <section className="flex justify-center items-center h-full w-full">
      <div className="">
        <h1 className="text-3xl px-8">
          Bạn có muốn tham gia cộng đồng những nhà sáng tạo nội dung không ?
        </h1>
        <div className="flex justify-center py-6">
          <BtnJoinGroup />
        </div>
      </div>
    </section>
  );
}

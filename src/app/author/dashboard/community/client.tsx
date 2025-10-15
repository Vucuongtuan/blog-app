"use client";
import { ChatProvider } from "@/components/chatGroup/context";
import { ContextSocket } from "../provider";
import ChatGroup from "@/components/chatGroup";
import { useContext } from "react";
import BtnJoinGroup from "./btnJoinGroup";

export default function CommunityClient() {
  const context = useContext(ContextSocket);
  //check user join group
  return (
    <section className="px-1 h-[85vh] ">
      <ChatProvider>
        <h1 className="text-3xl font-semibold">Cộng đồng sáng tạo nội dung</h1>
        <ChatGroup />
      </ChatProvider>
    </section>
  );
}

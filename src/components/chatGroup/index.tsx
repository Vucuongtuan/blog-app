"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { ChatContext, ChatContextValue } from "./context";
import { useInView } from "react-intersection-observer";
import useStoreZ from "@/lib/stores";
const ChatGroup: React.FC = () => {
  const { messages, sendMessage, fetchPreviousMessages } = useContext(
    ChatContext
  ) as ChatContextValue;
  const [page, setPage] = useState<number>(1);
  const [changeMessage, setChangeMessage] = useState<string>("");
  const [loadMore, setLoadMore] = useState(true);
  const { ref, inView } = useInView();
  const { profile } = useStoreZ();
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (changeMessage.trim() !== "") {
      const payload = {
        senderId: profile?.id,
        content: changeMessage,
        senderName: profile?.name,
      } as {
        senderId: string;
        content: string;
        senderName: string;
      };
      sendMessage(payload);
      setChangeMessage("");
    }
  };

  useEffect(() => {
    if (inView && loadMore) {
      setPage((prev) => prev + 1);
      fetchPreviousMessages(page);
    }
  }, [inView, loadMore, page, fetchPreviousMessages]);

  useEffect(() => {
    const messageContainer = messagesContainerRef.current;
    if (!messageContainer) return;
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }, [messages]);

  useEffect(() => {
    fetchPreviousMessages(page);
  }, [fetchPreviousMessages, page]);

  useEffect(() => {
    const messageContainer = messagesContainerRef.current;
    if (!messageContainer) return;

    const handleScroll = () => {
      if (messageContainer.scrollTop <= 0) {
        setPage((prev) => prev + 1);
      }
    };

    messageContainer.addEventListener("scroll", handleScroll);

    return () => {
      messageContainer.removeEventListener("scroll", handleScroll);
    };
  }, [messagesContainerRef, fetchPreviousMessages]);

  if (profile === null) {
    return <>Please log in again.</>;
  }
  if (messages.length === 0) {
    return <>Please wait...</>;
  }

  return (
    <div className="w-full h-full">
      <div
        className="h-[90%] w-full p-2 overflow-y-scroll"
        ref={messagesContainerRef}
      >
        {loadMore && (
          <div ref={ref} className="mb-5 flex justify-center items-center">
            Loading ...
          </div>
        )}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message w-auto h-auto ${
              profile.id === message?.senderId ? "text-right" : "text-left"
            }`}
          >
            <div className="font-semibold">{message?.senderName}</div>
            <div
              className={`p-2 rounded-lg bg-blue-600 max-w-[200px] overflow-wrap break-all ${
                profile.id === message?.senderId ? "ml-auto" : ""
              }`}
            >
              <span>{message?.content}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="h-[10%] w-full flex">
        <textarea
          className="flex-grow p-2 border rounded resize-none"
          value={changeMessage}
          onChange={(e) => setChangeMessage(e.target.value)}
        />
        <button
          className="p-2 ml-2 bg-blue-500 text-white rounded"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatGroup;

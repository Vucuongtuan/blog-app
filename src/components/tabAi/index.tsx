"use client";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  MessageModel,
} from "@chatscope/chat-ui-kit-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import toast from "react-hot-toast";
import { SendHorizontal } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const API_KEY = "AIzaSyD5QqCTij-cMM5Rnr0iYz-oWFLaupPkz5M";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
interface Message {
  message: string;
  direction: string;
  sender: string;
}

const TabAi = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<any[]>([
    {
      text: "Hello, I'm Gemini AI ! Ask me anything!",
      sentTime: "just now",
      sender: "Gemini AI",
    },
  ]);
  const [changeInput, setChangeInput] = useState<string>("");
  const [isLoadingMessage, setIsLoadingMessage] = useState<number | null>(null);
  const processMessageToChatAI = async (message: any) => {
    const result = await model.generateContent(message);
    const text = result.response.text();
    const isCode = text.includes("```");
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        text: text,
        sender: "Gemini AI",
        timestamp: new Date(),
        direction: "left",
        isCode,
      },
    ]);
  };
  const handleSubmit = async () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        text: changeInput,
        sender: "You",
        timestamp: new Date(),
        direction: "right",
      },
    ]);
    setIsLoadingMessage(messages.length);
    setIsLoading(true);
    try {
      await processMessageToChatAI(changeInput);
      setChangeInput("");
    } catch (err) {
      toast.error(JSON.stringify(err));
    } finally {
      setIsLoading(false);
      setIsLoadingMessage(null);
    }
  };
  return (
    <div className="h-full w-full ">
      <div style={{ position: "relative" }} className="h-full ">
        <div className="h-[85%] w-full overflow-y-scroll">
          <>
            {messages.map((item: any, index: number) => (
              <div
                className={`flex ${
                  item.direction === "right" ? "justify-end" : "justify-start"
                }`}
                key={index}
              >
                <div
                  className={`  p-2 rounded-lg max-w-[70%] ${
                    item.direction === "right" ? " dark:text-white" : ""
                  }`}
                >
                  <span>{item.sender} </span>

                  <div
                    className="bg-slate-600 rounded-xl p-1"
                    dangerouslySetInnerHTML={{
                      __html: item?.text,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </>
          {isLoading ? (
            <div className="h-[100px] w-full space-y-1">
              <Skeleton className="w-[50px] h-[10px] rounded-full" />
              <p className="space-y-2">
                <Skeleton className="w-1/3 h-[10px] rounded-full" />
                <Skeleton className="w-2/3 h-[10px] rounded-full" />
                <Skeleton className="w-full h-[10px] rounded-full" />
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="  absolute bottom-1 h-[15%] w-full flex justify-center items-center">
          <textarea
            id="message"
            onChange={(e) => setChangeInput(e.target.value)}
            placeholder="Chat message here "
            className=" bg-transparent border-2 p-1 rounded-lg  resize-none w-[85%] h-full"
          />
          <button
            className="flex-grow rounded-[100%]  h-[45px] w-[30px]"
            type="submit"
            onClick={handleSubmit}
          >
            <SendHorizontal className="h-6 w-6 m-auto" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TabAi;

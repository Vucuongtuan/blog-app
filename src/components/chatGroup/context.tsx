"use client";
import {
  createContext,
  useReducer,
  useEffect,
  useCallback,
  useState,
  useContext,
  useRef,
} from "react";
import { SocketClient } from "@/app/socket";
import { ApiAuthor } from "@/api/author.api";
import toast from "react-hot-toast";
import { useInView } from "react-intersection-observer";
import useStoreZ from "@/lib/stores";

// Define Message and ChatState interfaces
interface Message {
  senderId: string;
  content: string;
  senderName: string;
}

interface ChatState {
  messages: Message[];
}

// Define ChatAction types
type ChatAction =
  | { type: "ADD_MESSAGE"; payload: Message }
  | { type: "SET_MESSAGES"; payload: Message[] }
  | { type: "APPEND_MESSAGES"; payload: Message[] };

// Reducer to manage chat state
const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return { messages: [...state.messages, action.payload] };
    case "SET_MESSAGES":
      return { messages: action.payload };
    case "APPEND_MESSAGES":
      return { messages: [...action.payload, ...state.messages] };
    default:
      return state;
  }
};

// Define ChatContextValue interface
export interface ChatContextValue {
  messages: Message[];
  sendMessage: (message: Message) => void;
  fetchPreviousMessages: (number: number) => void;
}

// Create ChatContext
export const ChatContext = createContext<ChatContextValue | null>(null);

// ChatProvider component to provide chat state and actions
export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(chatReducer, { messages: [] });

  const fetchData = useCallback(async (page?: number, append?: boolean) => {
    const api = new ApiAuthor();
    const res = await api.getALlMessage(page);
    if (res.statusCode !== 200) {
      toast.error(res.message);
      return;
    }

    if (append) {
      dispatch({ type: "APPEND_MESSAGES", payload: res.data.data.reverse() });
    } else {
      dispatch({ type: "SET_MESSAGES", payload: res.data.data.reverse() });
    }
  }, []);

  useEffect(() => {
    fetchData(1);
  }, [fetchData]);

  useEffect(() => {
    const socket = SocketClient();
    socket.on("message", (newMessage: any) => {
      dispatch({ type: "ADD_MESSAGE", payload: newMessage });
    });

    return () => {
      socket.disconnect();
    };
  }, [fetchData]);

  const sendMessage = useCallback((message: Message) => {
    dispatch({ type: "ADD_MESSAGE", payload: message });
    SocketClient().emit("message", message);
  }, []);

  const fetchPreviousMessages = useCallback(
    (number: number) => {
      fetchData(number, true);
    },
    [fetchData]
  );

  return (
    <ChatContext.Provider
      value={{
        messages: state.messages,
        sendMessage,
        fetchPreviousMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

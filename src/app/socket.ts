"use client";

import { io } from "socket.io-client";
import Cookies from "js-cookie";

export const SocketClient = (token?: string | null) => {
  const socket = io(`${process.env.NEXT_PUBLIC_BASE_URL}`, {
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return socket;
};
// export class SocketClient {
//   private token?: string | null;
//   constructor(token?: string | null) {
//     this.token = token;
//   }
//   connectSocket = io("http://localhost:4000", {
//     extraHeaders: {
//       Authorization: `Bearer ${this.token}`,
//     },
//   });
//   connected() {
//     return this.connectSocket;
//   }

//   connect() {
//     this.connectSocket.connect();
//   }

//   disconnect() {
//     this.connectSocket.disconnect();
//   }

//   onMessage(callback: (value: any) => void) {
//     this.connectSocket.on("newMessage", callback);
//   }

//   onMessageHistory(callback: (messages: any[]) => void) {
//     this.connectSocket.on("messageHistory", callback);
//   }

//   sendMessage(message: string) {
//     this.connectSocket.emit("sendMessage", message);
//   }

//   onConnected(callback: () => void) {
//     this.connectSocket.on("connected", callback);
//   }

//   onDisconnected(callback: () => void) {
//     this.connectSocket.on("disconnected", callback);
//   }
//   requestMessages() {
//     this.connectSocket.emit("message");
//   }
// }

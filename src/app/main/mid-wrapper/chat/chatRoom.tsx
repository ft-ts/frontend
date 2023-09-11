"use client";

import React, { useState, useEffect, useRef, useContext } from "react";
import styles from "./chat-wrapper.module.scss";
import MessageItem from "./messageItem";
import ChatMessage from "./interfaces/chatMessage.interface";
import { socket } from "../../components/CheckAuth";
import { useGlobalContext } from "@/app/Context/store";


export default function ChatRoom() {
  const { channelId, channel }: any = useGlobalContext();
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
    }
};

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    // Listen for new messages
    if (channel === null) {
      return;
    }
    socket.on("channel/sendMessage", (message: ChatMessage) => {
      setChatMessages((prevMessages) => [...prevMessages, message]);
    });

    // Request initial messages
    socket.emit("channel/getChannelMessages", { channelId });
    socket.on("channel/getChannelMessages", (messages: ChatMessage[]) => {
      setChatMessages(messages);
    });

    socket.on("channel/userJoined", (data: { userName: string }) => {
      socket.emit("channel/sendNotification", {
        channelId: channelId,
        content: `${data.userName} has joined the channel`,
        });
    });

    socket.on("channel/userLeft", (data: { chId: number, user: string }) => {
      console.log("data: ", data);
      socket.emit("channel/sendNotification", {
        channelId: data.chId,
        content: `${data.user} has left the channel`,
        });
    });

    document.body.scrollTop = document.body.scrollHeight;

    return () => {
      // Clean up the event listener when component unmounts
      socket.off("channel/getChannelMessages");
      socket.off("channel/sendMessage");
      socket.off("channel/userJoined");
      socket.off("channel/userLeft");
    };
  }, [channel]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") {
      return;
    }

    // Send the message to the backend
    if (channelId !== null)
    {
      socket.emit("channel/sendMessage", {
        channelId: channelId,
        content: inputMessage,
      });
      
    }
    setInputMessage("");
  };

  return (
    <div className={styles.chatRoomBox}>
      
      <div className={styles.chatDisplay} ref={messageEndRef}>
        { channelId && chatMessages && 
          chatMessages.map((chatMessages) => (
            <MessageItem key={chatMessages.id} chatMessage={chatMessages} />
          ))}
      </div>
      { channelId && (
      <span className={styles.spanSendMessage}>
        <input
          className={styles.inputMessageBox}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // Prevent default behavior (form submission)
              handleSendMessage();
            }
          }}
        ></input>
        <button className={styles.messageSendBox} onClick={handleSendMessage}>
          SEND
        </button>
      </span>
    )}
    </div>
  );
}



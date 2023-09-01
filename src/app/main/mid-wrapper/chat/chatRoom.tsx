import React, { useState, useEffect, useRef } from "react";
import styles from "./chat-wrapper.module.scss";
import { Socket } from "socket.io-client";
import MessageItem from "./messageItem";
import ChatMessage from "./interfaces/chatMessage.interface";
import { socket_channel } from "@/app/api/client";

export default function ChatRoom({ channelId }: { channelId: number | null }) {
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
    if (channelId === null) {
      return;
    }
    socket_channel.on("sendMessage", (message: ChatMessage) => {
      setChatMessages((prevMessages) => [...prevMessages, message]);
    });

    // Request initial messages
    socket_channel.emit("getChannelMessages", { channelId });
    socket_channel.on("getChannelMessages", (messages: ChatMessage[]) => {
      setChatMessages(messages);
    });

    document.body.scrollTop = document.body.scrollHeight;

    return () => {
      // Clean up the event listener when component unmounts
      socket_channel.off("getChannelMessages");
      socket_channel.off("sendMessage");
    };
  }, [channelId]);


  const handleSendMessage = () => {
    if (inputMessage.trim() === "") {
      return;
    }

    // Send the message to the backend
    socket_channel.emit("sendMessage", {
      channelId: channelId,
      content: inputMessage,
    });
    setInputMessage("");
  };

  return (
    <div className={styles.chatRoomBox}>
      <div className={styles.chatDisplay} ref={messageEndRef}>
        {chatMessages && 
          chatMessages.map((chatMessages) => (
            <MessageItem key={chatMessages.id} chatMessage={chatMessages} />
          ))}
      </div>
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
    </div>
  );
}



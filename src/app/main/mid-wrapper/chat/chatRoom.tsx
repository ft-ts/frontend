import React, { useState, useEffect } from "react";
import styles from "./chat-wrapper.module.scss";
import { Socket } from "socket.io-client";
import MessageItem from "./messageItem";
import ChatMessage from "./interfaces/chatMessage.interface";
import { socket_channel } from "@/app/api/client";

export default function ChatRoom({ channelId }: { channelId: number | null }) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const [inputMessage, setInputMessage] = useState<string>("");

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") {
      return;
    }

    // Send the message to the backend
    socket_channel.emit("sendMessage", {
      channelId: channelId,
      content: inputMessage,
    });

    setInputMessage(""); // Clear the input after sending
  };

  useEffect(() => {
    // Listen for new messages
    socket_channel.on("sendMessage", (message: ChatMessage) => {
      setChatMessages((prevMessages) => [...prevMessages, message]);
    });

    // Request initial messages
    socket_channel.emit("getChannelMessages", { channelId });
    socket_channel.on("getChannelMessages", (messages: ChatMessage[]) => {
      setChatMessages(messages);
    });

    return () => {
      // Clean up the event listener when component unmounts
      socket_channel.off("sendMessage");
      socket_channel.off("getChannelMessages");
    };
  }, [channelId]);


  return (
    <div className={styles.chatRoomBox}>
      <div className={styles.chatDisplay}>
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

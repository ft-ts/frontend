
import React, { useState, useEffect } from "react";
import styles from "./chat-wrapper.module.scss";
import { Socket } from "socket.io-client";
import MessageItem from "./messageItem";
import ChatMessage from "./interfaces/chatMessage.interface";

export default function ChatRoom({
  socket,
  channelId,
}: {
  socket: Socket;
  channelId: number | null;
}) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") {
      return;
    }

    // Send the message to the backend
    socket.emit("sendMessage", {
      channelId: channelId,
      content: inputMessage,
    });

    setInputMessage(""); // Clear the input after sending
  };

  const handleReceiveMessage = (message: ChatMessage) => {
    setChatMessages((prevMessages) => [...prevMessages, message]);
  };

  useEffect(() => {
    socket.emit("getChannelMessages", channelId);
    socket.on("getChannelMessages", (messages: ChatMessage[]) => {
      setChatMessages(messages);
    });
    return () => {
      socket.off("getChatMessages");
    };
  }, [socket, channelId]);

  return (
    <div className={styles.chatRoomBox}>
      <div className={styles.chatDisplay}>
        {chatMessages &&
          chatMessages.map((chatMessages) => (
            <MessageItem chatMessage={chatMessages} 
            />
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

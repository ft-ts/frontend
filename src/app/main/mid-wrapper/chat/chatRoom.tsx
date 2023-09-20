"use client";

import React, { useState, useEffect, useRef, useContext } from "react";
import styles from "./chat-wrapper.module.scss";
import MessageItem from "./messageItem";
import ChatMessage from "./interfaces/chatMessage.interface";
import { socket } from "../../components/CheckAuth";
import { useGlobalContext } from "@/app/Context/store";
import DmMessage from "./interfaces/dmMessage.interface";
import DmMessageItem from "./dmMessageItem";
import { getDm } from "@/app/axios/client";

export default function ChatRoom() {
  const { channelId, channel }: any = useGlobalContext();
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [dmMessages, setDmMessages] = useState<DmMessage[]>([]);

  const [inputMessage, setInputMessage] = useState<string>("");
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const { dmId }: any = useGlobalContext();

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
    if (channelId) {
      // Request initial messages
      socket.emit("channel/getChannelMessages", { channelId });
      socket.on("channel/getChannelMessages", (messages: ChatMessage[]) => {
        setChatMessages(messages);
      });

      socket.on("channel/sendMessage", (message: ChatMessage) => {
        setChatMessages((prevMessages) => [...prevMessages, message]);
      });

      socket.on(
        "channel/userJoined",
        (data: { chId: number; user: string }) => {
          socket.emit("channel/sendNotification", {
            channelId: data.chId,
            content: `${data.user} has joined the channel`,
          });
        }
      );

      socket.on("channel/userLeft", (data: { chId: number; user: string }) => {
        socket.emit("channel/sendNotification", {
          channelId: data.chId,
          content: `${data.user} has left the channel`,
        });
      });
    }

    if (dmId) {
      // getDm(dmId).then((res) => {
      //   setDmMessages(res.data);
      // });

      socket.on("dm/msg", (message: DmMessage) => {
        setDmMessages((prevMessages) => [...prevMessages, message]);
      });
    }
    document.body.scrollTop = document.body.scrollHeight;

    return () => {
      // Clean up the event listener when component unmounts
      socket.off("channel/getChannelMessages");
      socket.off("channel/sendMessage");
      socket.off("channel/userJoined");
      socket.off("channel/userLeft");
      socket.off("dm/msg");
    };
  }, [channelId, dmId]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") {
      return;
    }
    // Send the message to the backend
    if (channelId) {
      socket.emit("channel/sendMessage", {
        channelId: channelId,
        content: inputMessage,
      });
    } else if (dmId) {
      socket.emit("dm/msg", {
        targetUid: dmId,
        message: inputMessage,
      });
    }
    setInputMessage("");
  };

  useEffect(() => { }, [channelId, dmId]);

  return (
    <div className={styles.chatRoomBox}>
      <div className={styles.chatDisplay} ref={messageEndRef}>
        {channelId &&
          chatMessages?.map &&
          chatMessages.map((chatMessages) => (
            <MessageItem key={chatMessages.id} chatMessage={chatMessages} />
          ))}
        {dmId &&
          dmMessages?.map &&
          dmMessages.map((dmMessages) => (
            <DmMessageItem
              key={dmMessages.id}
              dmMessage={dmMessages} />
          ))}
      </div>
      {(channelId || dmId) && (
        <div className={styles.spanSendMessage}>
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
        </div>
      )}
    </div>
  );
}

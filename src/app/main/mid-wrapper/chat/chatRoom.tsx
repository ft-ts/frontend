"use client";

import React from 'react';
import styles from './chat-wrapper.module.scss';
import { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';

interface ChatMessage {
	id: number;
	sender_uid: number;
	content: string;
	timeStamp: Date;
} 

export default function ChatRoom({ socket, channelId }: { socket: Socket, channelId: number | null }){
	const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

	useEffect(() => {
		// Fetch chat messages for the given channelId
		socket.emit("getChatMessages", channelId);
		socket.on("receiveChatMessages", (messages: ChatMessage[]) => {
		setChatMessages(messages);
		});

    // Clean up event listener when component unmounts
    return () => {
      socket.off("receiveChatMessages");
    };
  }, [socket, channelId]);

	return (
		<div className={styles.chatRoomBox}>


		<span className={styles.spanSendMessage}>
		  <input className={styles.inputMessageBox}></input>
		  <button className={styles.messageSendBox}>SEND</button>
		</span>
	  </div>
	  );
  };

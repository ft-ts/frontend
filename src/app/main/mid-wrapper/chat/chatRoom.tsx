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
		socket.emit("getChatMessages", channelId);
		socket.on("getChatMessages", (messages: ChatMessage[]) => {
			setChatMessages(messages);
		});

    return () => {
      socket.off("getChatMessages");
    };
  }, [socket, channelId]);

	return (
		<div className={styles.chatRoomBox}>
		<div className={styles.chatDisplay}>

		</div>
		<span className={styles.spanSendMessage}>
		  <input className={styles.inputMessageBox}></input>
		  <button className={styles.messageSendBox}>SEND</button>
		</span>
	  </div>
	  );
  };

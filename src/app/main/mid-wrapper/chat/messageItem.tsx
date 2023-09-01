"use client";

import React, { useEffect, useState } from 'react';
import styles from './chat-wrapper.module.scss';
import ChatMessage from './interfaces/chatMessage.interface';
import { getMyInfo, getUserByUid } from '@/app/api/client';
import UserInterface from '@/app/api/interfaces/user.interface';
import { get } from 'http';
import Image from 'next/image';


function MessageItem({ chatMessage }: {chatMessage: ChatMessage}) {
  const [sender, setSender] = useState<UserInterface | null>(null);

  useEffect(() => {
    async function fetchSender() {
      try {
        const senderInfo = await getUserByUid(chatMessage.sender_uid);
        setSender(senderInfo);
      } catch (error) {
        console.error('Error fetching sender info:', error);
      }
    }
    fetchSender();
  }, [chatMessage]);


  return (
    <div className={`${styles.message} ${chatMessage.sender_uid === 1 ? styles.myMessage : styles.otherMessage}`}>
    {sender && (
      <button>
      <Image
          src={sender.avatar}
          alt="avatar"
          width={70}
          height={70}
        />
      </button>
      )}
      <div className = {styles.commonContents}>
      {sender && (
      <div className={styles.chatSenderName}>{sender.name}</div>
      )}
      <div className={styles.messageContent}>{chatMessage.content}</div>
      <div className={styles.messageTime}>{chatMessage.timeStamp.toLocaleString()}</div>
      </div>
    </div>
  );
}

export default MessageItem;

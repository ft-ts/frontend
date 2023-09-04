"use client";

import React, { useEffect, useState } from 'react';
import styles from './chat-wrapper.module.scss';
import ChatMessage from './interfaces/chatMessage.interface';
import { getMyInfo, getUserByUid } from '@/app/api/client';
import UserInterface from '@/app/api/interfaces/user.interface';
import Image from 'next/image';
import { useGlobalContext } from '@/app/Context/store';


function MessageItem({ chatMessage }: {chatMessage: ChatMessage}) {
  const { myInfo }: any = useGlobalContext();
  const [sender, setSender] = useState<UserInterface | null>(null);


  useEffect(() => {
    async function fetchSender() {
      try {
        const senderInfo = await getUserByUid(chatMessage.sender_uid);
        setSender(senderInfo.data);
      } catch (error) {
        console.error('Error fetching sender info:', error);
      }
    }
    fetchSender();
  }, [chatMessage]);

  const options = {
    timeZone: 'Asia/Seoul',
  };
  const formatTime = (time: Date) => {
    const date = new Date(time);
    return date.toLocaleString('en-US', options);
  }

  return (
    <div className={`${styles.message} ${chatMessage.sender_uid === myInfo.uid ? styles.myMessage : styles.otherMessage}`}>
    {sender && (
      <button className={chatMessage.sender_uid === myInfo.uid ? styles.myMessageProfileButton : styles.otherMessageProfileButton}>
      <Image className = {styles.chatProfilePicture}
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
      <div className={styles.messageTime}>{formatTime(chatMessage.timeStamp)}</div>
      </div>
    </div>
  );
}

export default MessageItem;

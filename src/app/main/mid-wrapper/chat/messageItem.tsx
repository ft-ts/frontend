"use client";

import React, { useEffect, useState } from 'react';
import styles from './chat-wrapper.module.scss';
import ChatMessage from './interfaces/chatMessage.interface';
import { getMyInfo, getUserByUid } from '@/app/api/client';
import UserInterface from '@/app/api/interfaces/user.interface';
import { get } from 'http';

function MessageItem({ chatMessage }: {chatMessage: ChatMessage}) {
  const [sender, setUserInfo] = useState({});
  getMyInfo().then((myInfo) => {
    setUserInfo(myInfo);
  });
  return (
    <div className={`${styles.message} ${chatMessage.sender_uid === 1 ? styles.myMessage : styles.otherMessage}`}>
      <div className={styles.chatProfilePicture}>{sender.avatar}</div>
      <div className = {styles.commonContents}>
      <div className={styles.chatSenderName}>{sender.name}</div>
      <div className={styles.messageContent}>{chatMessage.content}</div>
      <div className={styles.messageTime}>{chatMessage.timeStamp.toLocaleString()}</div>
      </div>
    </div>
  );
}

export default MessageItem;

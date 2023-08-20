import React from 'react';
import styles from './chat-wrapper.module.scss';
import MessageItemProps from './interfaces/messageItemProps.interface';

function MessageItem({ message, isMyMessage, senderName, senderProfilePicture }: MessageItemProps) {
  return (
    <div className={`${styles.message} ${isMyMessage ? styles.myMessage : styles.otherMessage}`}>
      <div className={styles.chatProfilePicture}>{senderProfilePicture}</div>
      <div className={styles.chatSenderName}>{senderName}</div>
      <div className={styles.messageContent}>{message.content}</div>
      <div className={styles.messageTime}>{message.timeStamp.toLocaleString()}</div>
    </div>
  );
}

export default MessageItem;

"use client";

import React, { useEffect, useState } from "react";
import styles from "./chat-wrapper.module.scss";
import ChatMessage from "./interfaces/chatMessage.interface";
import { getUserByUid } from "@/app/axios/client";
import UserInterface from "@/app/axios/interfaces/user.interface";
import { useGlobalContext } from "@/app/Context/store";
import { formatTime } from "./chat.utils";
import { userInfo } from "os";

function MessageItem({ chatMessage }: { chatMessage: ChatMessage }) {

  return (
    <div>
    {chatMessage.isNotice ? (
      <NotiMessage chatMessage={chatMessage}/>
    ) : (
      <UserMessage chatMessage={chatMessage}/>
    )}
    </div>
  );
}

const UserMessage = ({ chatMessage }: { chatMessage: ChatMessage}) => {
  const { myInfo }: any = useGlobalContext();
  const { setCurrentUser }: any = useGlobalContext();

  
  const handleClickedProfile = () => {
    setCurrentUser(chatMessage.sender);
  }

  return (
    <div
      className={`${styles.message} ${
        chatMessage.sender?.uid === myInfo.uid
          ? styles.myMessage : styles.otherMessage
      }`}
    >
      {chatMessage.sender && (
        <button
          className={
            chatMessage.sender.uid === myInfo.uid
              ? styles.myMessageProfileButton
              : styles.otherMessageProfileButton
          }
          onClick={handleClickedProfile}
        >
          <img
            className={styles.chatProfilePicture}
            src={chatMessage.sender.avatar}
            alt="avatar"
            width={70}
            height={70}
          />
        </button>
      )}
      <div className={styles.commonContents}>
        {chatMessage.sender && <div className={styles.chatSenderName}>{chatMessage.sender.name}</div>}
        <div className={styles.messageContent}>{chatMessage.content}</div>
        <div className={styles.messageTime}>
          {formatTime(chatMessage.timeStamp)}
        </div>
      </div>
    </div>
  )
}

const NotiMessage = ({ chatMessage }: { chatMessage: ChatMessage }) => {
  return (
    <div className={styles.notiMessage}>
      <div className={styles.notiMessageContent}>{chatMessage.content}</div>
    </div>
  );
}


export default MessageItem;

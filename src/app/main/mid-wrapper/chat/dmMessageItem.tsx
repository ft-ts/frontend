import React, { useEffect, useState } from "react";
import styles from "./chat-wrapper.module.scss";
import Image from "next/image";
import { useGlobalContext } from "@/app/Context/store";
import DmMessage from "./interfaces/dmMessage.interface";

function DmMessageItem({ dmMessage }: { dmMessage: DmMessage }) {
  const { myInfo }: any = useGlobalContext();

  const options = {
    timeZone: "Asia/Seoul",
  };
  const formatTime = (time: Date) => {
    const date = new Date(time);
    return date.toLocaleString("en-US", options);
  };

  return (
    <div
      className={`${
        dmMessage.sender.uid === myInfo.uid
          ? styles.myMessage
          : styles.otherMessage
      }`}
    >
      {dmMessage.sender && (
        <button
          className={
            dmMessage.sender.uid === myInfo.uid
              ? styles.myMessageProfileButton
              : styles.otherMessageProfileButton
          }
        >
          <Image
            className={styles.chatProfilePicture}
            src={dmMessage.sender.avatar}
            alt="avatar"
            width={70}
            height={70}
          />
        </button>
      )}
      <div className={styles.commonContents}>
        {dmMessage.sender && (
          <div className={styles.chatSenderName}>{dmMessage.sender.name}</div>
        )}
        <div className={styles.messageContent}>{dmMessage.message}</div>
        <div className={styles.messageTime}>
          {formatTime(dmMessage.createdAt)}
          <br></br>
        </div>
      </div>
    </div>
  );
}

export default DmMessageItem;

import React, { useEffect, useState } from "react";
import styles from "./chat-wrapper.module.scss";
import { useGlobalContext } from "@/app/Context/store";
import DmMessage from "./interfaces/dmMessage.interface";
import { formatTime } from "./chat.utils";
import { getUserByUid } from "@/app/axios/client";

function DmMessageItem({ dmMessage }: { dmMessage: DmMessage }) {
  const { myInfo }: any = useGlobalContext();
  const { setCurrentUser } : any = useGlobalContext();

  const handleClickedProfile = async (sender: any) => {
    await getUserByUid(sender.uid).then((res) => {
      setCurrentUser(res.data);
    }).catch((err) => {
      console.log('dmMessageItem.tsx',err);
    });
    
  }

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
          onClick={() => handleClickedProfile(dmMessage.sender)}
        >
          <img
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
          {formatTime(dmMessage.created_at)}
          <br></br>
        </div>
      </div>
    </div>
  );
}

export default DmMessageItem;

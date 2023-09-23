"use client";

import React, { useEffect, useState } from "react";
import styles from "./button.module.scss";
import { User } from "@/app/main/interface/User.interface";
import { socket } from "@/app/main/components/CheckAuth";
import { postFriend, postBlockUser } from "@/app/axios/client";
import { useGlobalContext } from "@/app/Context/store";
import { getUserByUid } from "@/app/axios/client";
import { DmListProps } from "@/app/main/left-wrapper/interfaces/dmItemProps";

const block = "/asset/muteIcon.png";
const addFriend = "/asset/plus.png";
const inviteMatch = "/asset/pongIcon.png";
const dm = "/asset/msgIcon.png";

export default function ProfileButton({ user }: { user: User }) {
  const { dmList, setDmList }: any = useGlobalContext();
  const { setCurrentChannelId} : any = useGlobalContext();
  const { currentDmId, setCurrentDmId }: any = useGlobalContext();

  const handleAddFriend = () => {
    postFriend(user.uid).then((res) => {
      socket.emit('update/friends');
    }).catch((err) => {
      console.log(err);
    });
  };
  const handleBlock = () => {
    console.log("handleBlock");
    postBlockUser(user.uid).then((res) => {
    }).catch((err) => {
        console.log(err);
    });
  };

  const handleInviteMatch = () => {
    socket.emit("pong/match/invite", { uid: user.uid });
  };

  const handleDM = async () => {
    if (currentDmId === user.uid) {
      return;
    } 
    setCurrentChannelId(null);
    setCurrentDmId(user.uid);
    if (dmList.some((dmItem: DmListProps) => dmItem.user_uid === user.uid)) {
      return;
    }
    const dmTargetUser = await getUserByUid(user.uid);
    const dmItemProps: DmListProps = {
      user_uid: dmTargetUser.data.uid,
      user_name: dmTargetUser.data.name,
      user_avatar: dmTargetUser.data.avatar,
      unread_count: 0,
    };
    setDmList((prevDmItemProps: DmListProps[] | null) => [...(prevDmItemProps || []), dmItemProps]);
  }
    
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.buttonBox} onClick={handleAddFriend}>
        <img
          className={styles.imageBox}
          src={addFriend}
          alt="addFriend"
          width={60}
          height={60}
        />
      </button>
      <button className={styles.buttonBox} onClick={handleDM}>
        <img
          className={styles.imageBox}
          src={dm}
          alt="dm"
          width={60}
          height={60}
        />
      </button>
      <button className={styles.buttonBox} onClick={handleInviteMatch}>
        <img
          className={styles.imageBox}
          src={inviteMatch}
          alt="inviteMatch"
          width={60}
          height={60}
        />
      </button>
      <button className={styles.buttonBox} onClick={handleBlock}>
        <img
          className={styles.imageBox}
          src={block}
          alt="block"
          width={60}
          height={60}
        />
      </button>
    </div>
  );
}


"use client";

import React, { useEffect, useState } from "react";
import styles from "./button.module.scss";
import Image from "next/image";
import { User } from "@/app/main/interface/User.interface";
import { socket } from "@/app/main/components/CheckAuth";
import { postFriend } from "@/app/axios/client";
import { useGlobalContext } from "@/app/Context/store";
import UserInterface from "@/app/axios/interfaces/user.interface";
import { getUserByUid } from "@/app/axios/client";
import DmItemProps from "@/app/main/left-wrapper/interfaces/dmItemProps";
import { set } from "react-hook-form";
import React from 'react';
import styles from './button.module.scss';
import Image from 'next/image';
import { User } from '@/app/main/interface/User.interface';
import { socket } from '@/app/main/components/CheckAuth';
import { postFriend } from '@/app/axios/client';
import { useGlobalContext } from '@/app/Context/store';

const block = "/asset/muteIcon.png";
const addFriend = "/asset/plus.png";
const inviteMatch = "/asset/pongIcon.png";
const dm = "/asset/msgIcon.png";

export default function ProfileButton({ user }: { user: User }) {
  const { dmId, setDmId, setChannelId }: any = useGlobalContext();
  const { dmList, setDmList }: any = useGlobalContext();
  const [dmTargetUser, setDmTargetUser] = useState<UserInterface | null>(null);
  const handleAddFriend = () => {
    console.log("handleAddFriend");
    postFriend(user.uid).then((res) => {
      console.log(res.data);
    });
  };
  const handleBlock = () => {
    console.log("handleBlock");
  };

  const handleInviteMatch = () => {
    console.log("handleInviteMatch");
    socket.emit("pong/match/invite", { uid: user.uid });
  };

  const handleDM = async () => {
    setChannelId(null);
    setDmId(user.uid);
  
    // dmTargetUser를 가져옵니다.
    const dmTargetUser = await getUserByUid(user.uid);

    //이미 리스트에 있으면 추가 안해도 됨.
    const isUserInDmList = dmList?.some((dmItem: DmItemProps) => dmItem.targetUid === dmTargetUser.data.uid);

    
    // 이미 있는 경우 추가하지 않음
  if (!isUserInDmList) {
    // dmTargetUser를 DmItemProps 형태로 변환합니다.
    const dmItemProps: DmItemProps = {
      targetUid: dmTargetUser.data.uid,
      name: dmTargetUser.data.name,
      avatar: dmTargetUser.data.avatar,
      status: dmTargetUser.data.status,
      onClick: () => handleDmClick(dmTargetUser.data.uid),
    };

    // 이전 dmList 상태를 기반으로 업데이트합니다.
    setDmList((prevDmItemProps: DmItemProps[] | null) => [...(prevDmItemProps || []), dmItemProps]);
  }
  };
    
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.buttonBox} onClick={handleAddFriend}>
        <Image
          className={styles.imageBox}
          src={addFriend}
          alt="addFriend"
          width={60}
          height={60}
        />
      </button>
      <button className={styles.buttonBox} onClick={handleDM}>
        <Image
          className={styles.imageBox}
          src={dm}
          alt="dm"
          width={60}
          height={60}
        />
      </button>
      <button className={styles.buttonBox} onClick={handleInviteMatch}>
        <Image
          className={styles.imageBox}
          src={inviteMatch}
          alt="inviteMatch"
          width={60}
          height={60}
        />
      </button>
      <button className={styles.buttonBox} onClick={handleBlock}>
        <Image
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

function handleDmClick(uid: number): void {
  console.log("handleDmClick");
}


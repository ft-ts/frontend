"use client";

import React from "react";
import { ChannelUser } from "../../../mid-wrapper/chat/interfaces/channelUser.interface"
import styles from './userList.module.scss';
import Image from "next/image";
import { getStatusColor } from "../../Common/right-wrapper.utils";
import { UserStatus } from "@/app/main/enum/UserStatus.enum";
import { User } from "@/app/main/interface/User.interface";

export default function UserListChannel(
  {
    item,
    myInfo,
    setCurrentUser,
    setIsMe,
  }:{
    item: ChannelUser
    myInfo: User
    setCurrentUser: React.Dispatch<React.SetStateAction<User>>
    setIsMe: React.Dispatch<React.SetStateAction<boolean>>
  })
  {

    const handleClick = () => {
      setCurrentUser(item.user);
      if (myInfo.uid === item.user.uid) {
        setIsMe(true);
      } else {
        setIsMe(false);
      }
    }

  return (
    <button onClick={handleClick} className={styles.userListContainer}>
      <div className={styles.userChatRoleBox}>
        <h2 className={styles.userChatRole}>1</h2>
      </div>
      <div className={styles.userAvatarBox}>
        <Image src={item.user.avatar} width={80} height={80} alt={item.user.name} className={styles.userAvatar}></Image>
      </div>
      <div className={styles.userNameBox}>
        <h2 className={styles.userName}>{item.user.name}</h2>
      </div>
      <div className={styles.userStatusBox}>
        <h2 className={`styles.userStatus ${getStatusColor(item.user.status as UserStatus)}`}>{item.user.status}</h2>
      </div>
    </button>
  )
}
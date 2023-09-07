"use client";

import React, { useEffect, useState } from "react";
import { ChannelUser } from "../../../mid-wrapper/chat/interfaces/channelUser.interface"
import styles from "./userListItem.module.scss";
import Image from "next/image";
import { getStatusColor } from "../userList.utils";
import { useGlobalContext } from "@/app/Context/store";
import { UserStatus } from "@/app/main/enum/UserStatus.enum";

export function ChannelMembersItem({item, state}: {item: ChannelUser, state: any}) {
  const [menuOn, setMenuOn, selectedUser, setSelectedUser] = state;
  const { myInfo, setMyInfo }: any = useGlobalContext();

  const toggleMenu = () => {
      setMenuOn(!menuOn);
      setSelectedUser({name: item.user.name, uid: item.user.uid});
      console.log('selectedUser', selectedUser.name, myInfo.name);
  }

  return (
    <div onClick={toggleMenu} className={styles.userListContainer}>
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
    </div>
  )
}
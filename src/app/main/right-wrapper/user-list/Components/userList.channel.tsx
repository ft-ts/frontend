"use client";

import React, {useState} from "react";
import { ChannelUser } from "../../../mid-wrapper/chat/interfaces/channelUser.interface"
import styles from './userList.module.scss';
import { ChannelRole } from "@/app/main/mid-wrapper/chat/enum/channelRole.enum";
import { useGlobalContext } from "@/app/Context/store";

const owner = "/asset/crown.png";
const admin = "/asset/admin.png";
const person = "/asset/person.png";

export default function UserListChannel({ item }:{ item: ChannelUser })
  {
    const { setCurrentUser } : any = useGlobalContext();
    const { setCurrentUserRole } : any = useGlobalContext();

    const handleClick = () => {
      setCurrentUser(item.user);
      setCurrentUserRole(item.role);
    }

  return (
    <div className={styles.userListContainer}>
      <button onClick={handleClick} className={styles.userListBox}>
        <div className={styles.userChatRoleBox}>
        <img src={userRole(item.role)} width={30} height={30} alt={item.user.name}/>
        </div>
        <div className={styles.userAvatarBox}>
          <img src={item.user.avatar} width={80} height={80} alt={item.user.name} className={styles.userAvatar}/>
        </div>
        <div className={styles.userNameBox}>
          <h2 className={styles.userName}>{item.user.name}</h2>
        </div>
      </button>
    </div>
  )
}

const userRole = (role: ChannelRole) => {
  if (role === ChannelRole.OWNER) {
    return owner;
  } else if (role === ChannelRole.ADMIN) {
    return admin;
  }
  return person;
}
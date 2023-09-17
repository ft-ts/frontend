"use client";

import React from "react";
import { ChannelUser } from "../../../mid-wrapper/chat/interfaces/channelUser.interface"
import styles from './userList.module.scss';
import Image from "next/image";
import { User } from "@/app/main/interface/User.interface";
import { ChannelRole } from "@/app/main/mid-wrapper/chat/enum/channelRole.enum";

const owner = "/asset/crown.png";
const admin = "/asset/admin.png";
const person = "/asset/person.png";
const mute = "/asset/muteIcon.png";
const ban = "/asset/banIcon.png";

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

    const handleSetAdmin = () => {
      console.log('SetAdmin');
    }

    const handleKick = () => {
      console.log('Kick');
    }
    
    const handleBan = () => {
      console.log('Ban', myInfo);
    }

  return (
    <div className={styles.channel}>
      <button onClick={handleClick} className={`${styles.userListContainer} ${styles.channelWidth}`}>
        <div className={styles.userChatRoleBox}>
        <Image src={userRole(item.role)} width={30} height={30} alt={item.user.name}></Image>
        </div>
        <div className={styles.userAvatarBox}>
          <Image src={item.user.avatar} width={80} height={80} alt={item.user.name} className={styles.userAvatar}></Image>
        </div>
        <div className={styles.userNameBox}>
          <h2 className={styles.userName}>{item.user.name}</h2>
        </div>
      </button>
      <div className={styles.userListButtonContainer}>
        {<button className={styles.buttonBox}>
          <Image src={admin} width={30} height={30} alt="admin" onClick={handleSetAdmin}></Image>
        </button>}
        <button className={styles.buttonBox}>
          <Image src={mute} width={40} height={40} alt="kick" onClick={handleKick}></Image>
        </button>
        <button className={styles.buttonBox}>
          {<Image src={ban} width={40} height={40} alt="ban" onClick={handleBan}></Image>}
        </button>
      </div>
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

const checkOwner = (role: ChannelRole) : boolean => {
  if (role === ChannelRole.OWNER) {
    return true;
  }
  return false;
}

const checkAdmin = (role: ChannelRole) : boolean => {
  if (role === ChannelRole.ADMIN || role === ChannelRole.OWNER) {
    return true;
  }
  return false;
}
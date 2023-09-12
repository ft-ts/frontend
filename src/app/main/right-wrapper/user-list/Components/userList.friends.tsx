'use client';

import React from 'react';
import styles from './userList.module.scss';
import Image from 'next/image';
import { getStatusColor } from "../../Common/right-wrapper.utils";
import { UserStatus } from '@/app/main/enum/UserStatus.enum';
import { User } from '@/app/main/interface/User.interface';

export default function UserListFriends(
  {
    user,
    myInfo,
    setCurrentUser,
    setIsMe,
  }:{
    user: User
    myInfo: User
    setCurrentUser: React.Dispatch<React.SetStateAction<User>>
    setIsMe: React.Dispatch<React.SetStateAction<boolean>>
  })
  {

    const handleClick = () => {
      setCurrentUser(user);
      if (myInfo.uid === user.uid) {
        setIsMe(true);
      } else {
        setIsMe(false);
      }
    }

  return (
    <button onClick={handleClick} className={styles.userListContainer}>
      <div className={styles.userChatRoleBox}>
      </div>
      <div className={styles.userAvatarBox}>
        <Image src={user.avatar} width={80} height={80} alt={user.name} className={styles.userAvatar}></Image>
      </div>
      <div className={styles.userNameBox}>
        <div className={styles.userName}>{user.name}</div>
      </div>
      <div className={styles.userStatusBox}>
        <div className={`styles.userStatus ${getStatusColor(user.status as UserStatus)}`}>{user.status}</div>
      </div>
    </button>
  )
}
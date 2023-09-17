'use client';

import React from 'react';
import styles from './userList.module.scss';
import Image from 'next/image';
import { renderUserStatus } from "../../Common/right-wrapper.utils";
import { UserStatus } from '@/app/main/enum/UserStatus.enum';
import { User } from '@/app/main/interface/User.interface';

export default function UserListAll(
  {
    myInfo,
    user,
    setCurrentUser,
    setIsMe,
  }:{
    myInfo: User
    user: User
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
    <div className={styles.all}>
      <button className={`${styles.userListContainer} ${styles.allWidth}`} onClick={handleClick}>
        {renderUserStatus({userStatus: user.status as UserStatus})}
        <div className={styles.userAvatarBox}>
          <Image src={user.avatar} width={80} height={80} alt={user.name} className={styles.userAvatar}></Image>
        </div>
        <div className={styles.userNameBox}>
          <div className={styles.userName}>{user.name}</div>
        </div>
      </button>
    </div>
  )
}
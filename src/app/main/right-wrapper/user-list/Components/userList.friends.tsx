'use client';

import React from 'react';
import styles from './userList.module.scss';
import Image from 'next/image';
import { renderUserStatus } from "../../Common/right-wrapper.utils";
import { UserStatus } from '@/app/main/enum/UserStatus.enum';
import { User } from '@/app/main/interface/User.interface';

const deleteFriend = "/asset/minus.png";
const invite = "/asset/inviteIcon.png";

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
    <div className={styles.friend}>
      <button onClick={handleClick} className={`${styles.userListContainer} ${styles.friendWidth}`}>
        {renderUserStatus({userStatus: user.status as UserStatus})}
        <div className={styles.userAvatarBox}>
          <Image src={user.avatar} width={60} height={60} alt={user.name} className={styles.userAvatar}></Image>
        </div>
        <div className={styles.userNameBox}>
          <div className={styles.userName}>{user.name}</div>
        </div>
      </button>
      <div className={styles.userListButtonContainer}>
        <button className={styles.buttonBox}>
          <Image src={deleteFriend} width={40} height={40} alt="deleteFriend"></Image>
        </button>
        <button className={styles.buttonBox}>
          <Image src={invite} width={40} height={40} alt="invite"></Image>
        </button>
      </div>
    </div>
  )
}
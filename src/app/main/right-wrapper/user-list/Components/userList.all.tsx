'use client';

import React from 'react';
import styles from './userList.module.scss';
import { renderUserStatus } from "../../Common/right-wrapper.utils";
import { UserStatus } from '@/app/main/enum/UserStatus.enum';
import { User } from '@/app/main/interface/User.interface';
import { useGlobalContext } from '@/app/Context/store';

export default function UserListAll(
  {
    user,
  }:{
    user: User
  })
{
  const { setCurrentUser }: any = useGlobalContext();
  
  const handleClick = () => {
    setCurrentUser(user);
  }


  return (
    <div className={styles.userListContainer}>
      <button className={`${styles.userListBox} ${styles.allWidth}`} onClick={handleClick}>
        {renderUserStatus({userStatus: user.status as UserStatus})}
        <div className={styles.userAvatarBox}>
          <img src={user.avatar} width={80} height={80} alt={user.name} className={styles.userAvatar}/>
        </div>
        <div className={styles.userNameBox}>
          <div className={styles.userName}>{user.name}</div>
        </div>
      </button>
    </div>
  )
}
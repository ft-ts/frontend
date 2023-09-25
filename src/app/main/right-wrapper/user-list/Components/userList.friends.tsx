'use client';

import React, { useEffect } from 'react';
import styles from './userList.module.scss';
import { renderUserStatus } from "../../Common/right-wrapper.utils";
import { UserStatus } from '@/app/main/enum/UserStatus.enum';
import { User } from '@/app/main/interface/User.interface';
import { useGlobalContext } from '@/app/Context/store';

export default function UserListFriends({ user }:{ user: User})
{
    const { setCurrentUser }: any = useGlobalContext();
    const { setCurrentUserRole }: any = useGlobalContext();

    const handleClick = () => {
      setCurrentUser(user);
      setCurrentUserRole(null);
    };

  return (
    <div className={styles.userListContainer}>
      <button onClick={handleClick} className={styles.userListBox}>
        {renderUserStatus({userStatus: user.status as UserStatus})}
        <div className={styles.userAvatarBox}>
          <img src={user.avatar} width={60} height={60} alt={user.name} className={styles.userAvatar}/>
        </div>
        <div className={styles.userNameBox}>
          <div className={styles.userName}>{user.name}</div>
        </div>
      </button>
    </div>
  )
}
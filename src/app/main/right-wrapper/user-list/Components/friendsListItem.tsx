'use client';

import { useEffect, useState } from 'react';
import styles from './userListItem.module.scss';
import Image from 'next/image';
import { getStatusColor } from '../userList.utils';
import { UserStatus } from '@/app/main/enum/UserStatus.enum';
import { useGlobalContext } from '@/app/Context/store';
import { User } from '@/app/main/interface/User.interface';

export function FriendsListItem({user, state}: {user: User, state: any}) {
  const [menuOn, setMenuOn, selectedUser, setSelectedUser] = state;
  const { myInfo, setMyInfo }: any = useGlobalContext();

  const toggleMenu = () => {
      setMenuOn(!menuOn);
      setSelectedUser({name: user.name, uid: user.uid});
      console.log('selectedUser', selectedUser.name, myInfo.name);
  }

  return (
    <div onClick={toggleMenu} className={styles.userListContainer}>
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
    </div>
  )
}
'use client';

import React from 'react';
import styles from './myInfo.module.scss';
import Image from 'next/image';
import { getStatusColor } from "../../Common/right-wrapper.utils";
import { UserStatus } from '@/app/main/enum/UserStatus.enum';
import { User } from '@/app/main/interface/User.interface';

const logoutIcon = "/asset/logoutIcon.png";

export default function MyInfo(
  {
    myInfo,
    setCurrentUser,
    setIsMe,
  }:{
    myInfo: User
    setCurrentUser: React.Dispatch<React.SetStateAction<User>>
    setIsMe: React.Dispatch<React.SetStateAction<boolean>>
  }
) {
  const handleClick = () => {
    setCurrentUser(myInfo);
    setIsMe(true);
  }
  return (
    <div className={styles.bottomContainer}>
      <button className={styles.bottomMyInfo} onClick={handleClick}>
        <div className={styles.myAvatarBox}>
          <Image className={styles.myAvatar} src={myInfo.avatar} alt={myInfo.name} width={80} height={80} />
        </div>
        <div className={styles.myNameBox}>
          <h2 className={styles.myName}>{myInfo.name}</h2>
        </div>
        <div className={styles.myStatusBox}>
          <div className={`styles.userStatus ${getStatusColor(myInfo.status as UserStatus)}`}>{myInfo.status}</div>
        </div>
      </button>
        <button className={styles.logoutBox} onClick={logout}>
          <Image className={styles.logoutIcon} src={logoutIcon} alt="logout" width={50} height={80}/>
        </button>
    </div>
  );
};

const logout = () => {
  console.log('logout');
}
'use client';

import React from 'react';
import styles from './myInfo.module.scss';
import Image from 'next/image';
import { getStatusColor, renderUserStatus } from "../../Common/right-wrapper.utils";
import { UserStatus } from '@/app/main/enum/UserStatus.enum';
import { User } from '@/app/main/interface/User.interface';
import { useGlobalContext } from '@/app/Context/store';

const logoutIcon = "/asset/logoutIcon.png";
const settingIcon = "/asset/settingIcon.png";

export default function MyInfo() {
  const { myInfo }: any = useGlobalContext();
  const { setCurrentUser }: any = useGlobalContext();

  const handleClick = () => {
    setCurrentUser(myInfo);
  }

  return (
    <div className={styles.bottomContainer}>
      <button className={styles.bottomMyInfo} onClick={handleClick}>
        { renderUserStatus({userStatus: myInfo.status as UserStatus}) }
        <div className={styles.myAvatarBox}>
          <Image className={styles.myAvatar} src={myInfo.avatar} alt={myInfo.name} width={80} height={80} />
        </div>
        <div className={styles.myNameBox}>
          <h2 className={styles.myName}>{myInfo.name}</h2>
        </div>
      </button>
      <button className={styles.myInfoButtonBox} onClick={logout}>
        <Image src={settingIcon} alt="setting" width={50} height={50}/>
      </button>
      <button className={styles.myInfoButtonBox} onClick={logout}>
        <Image  src={logoutIcon} alt="logout" width={50} height={50}/>
      </button>
    </div>
  );
};

const logout = () => {
  console.log('logout');
}
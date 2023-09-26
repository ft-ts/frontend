'use client';

import React from 'react';
import styles from './myInfo.module.scss';
import { renderUserStatus } from "../../Common/right-wrapper.utils";
import { UserStatus } from '@/app/main/enum/UserStatus.enum';
import { useGlobalContext } from '@/app/Context/store';
import { useRightWrapperContext } from '../../Context/rightWrapper.store';
import { useRouter } from 'next/navigation';

const logoutIcon = "/asset/logoutIcon.png";
const settingIcon = "/asset/settingIcon.png";

export default function MyInfo() {
  const router = useRouter();
  const { myInfo, setCurrentUser }: any = useGlobalContext();
  const { setEditModalOn }: any = useRightWrapperContext();
  const { blockList }: any = useGlobalContext();

  const handleClick = () => {
    setCurrentUser(myInfo);
    console.log('block',blockList);
    
  }

  const handleLogout = () => {
    document.cookie = "accesstoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
  }

  return (
    <div className={styles.bottomContainer}>
      <button className={styles.bottomMyInfo} onClick={handleClick}>
        { renderUserStatus({userStatus: myInfo.status as UserStatus}) }
        <div className={styles.myAvatarBox}>
          <img className={styles.myAvatar} src={myInfo.avatar} alt={myInfo.name} width={75} height={75} />
        </div>
        <div className={styles.myNameBox}>
          <h2 className={styles.myName}>{myInfo.name}</h2>
        </div>
      </button>
      <button onClick={() => setEditModalOn(true)} className={styles.myInfoButtonBox}>
        <img src={settingIcon} alt="setting" width={40} height={40}/>
      </button>
      <button onClick={handleLogout} className={styles.myInfoButtonBox}>
        <img src={logoutIcon} alt="logout" width={50} height={50}/>
      </button>
    </div>
  );
};
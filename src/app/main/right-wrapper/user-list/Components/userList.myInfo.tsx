'use client';

import React, { useState } from 'react';
import styles from './myInfo.module.scss';
import Image from 'next/image';
import { renderUserStatus } from "../../Common/right-wrapper.utils";
import { UserStatus } from '@/app/main/enum/UserStatus.enum';
import { useGlobalContext } from '@/app/Context/store';
import { useRedirect } from '@/app/main/hooks/useRedirect';

const logoutIcon = "/asset/logoutIcon.png";
const settingIcon = "/asset/settingIcon.png";

export default function MyInfo() {
  const { myInfo }: any = useGlobalContext();
  const { setCurrentUser }: any = useGlobalContext();
  const [onRedirect, setRedirect] = useState<string>("");
  useRedirect(onRedirect, onRedirect !== "");

  const handleClick = () => {
    setCurrentUser(myInfo);
  }

  const handleLogout = () => {
    document.cookie = "accesstoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setRedirect("/login");
  }

  return (
    <div className={styles.bottomContainer}>
      <button className={styles.bottomMyInfo} onClick={handleClick}>
        { renderUserStatus({userStatus: myInfo.status as UserStatus}) }
        <div className={styles.myAvatarBox}>
          <Image className={styles.myAvatar} src={myInfo.avatar} alt={myInfo.name} width={75} height={75} />
        </div>
        <div className={styles.myNameBox}>
          <h2 className={styles.myName}>{myInfo.name}</h2>
        </div>
      </button>
      <button className={styles.myInfoButtonBox}>
        <Image src={settingIcon} alt="setting" width={50} height={50}/>
      </button>
      <button onClick={handleLogout} className={styles.myInfoButtonBox}>
        <Image src={logoutIcon} alt="logout" width={50} height={50}/>
      </button>
    </div>
  );
};
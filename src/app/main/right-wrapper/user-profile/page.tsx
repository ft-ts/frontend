'use client'
import { useRecoilValue } from 'recoil';
import Styles from './user-profile.module.scss'
import Image from "next/image";
import { myInfo, myInfoSelector } from '@/app/recoil/myInfo';
import { getMyInfo } from '@/app/api/client';
import { useEffect, useState } from 'react';

interface User {
  uid: number,
  name: string,
  avatar: string,
  email: string,
  twoFactorAuth: boolean,
  status: string,
  rating: number,
  custom_wins: number,
  custom_losses: number,
  ladder_wins: number,
  ladder_losses: number,
}

enum UserStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  INGAME = 'IN-GAME',
}

export default function UserProfile() {
  const me = useRecoilValue(myInfo);
  const meSel = useRecoilValue(myInfoSelector);
  const [userInfo, setUserInfo] = useState({
    uid: 98267,
    name: "123",
    avatar: "https://cdn.intra.42.fr/users/cde32eb6c2fcfc6871aa7405912c40a7/dohyulee.jpg",
    email: "123@m.com",
    twoFactorAuth: false,
    status: UserStatus.ONLINE,
    rating: 1000,
    custom_wins: 0,
    custom_losses: 0,
    ladder_wins: 0,
    ladder_losses: 0,
  });
  
  useEffect(() => {
  }, []);
  

  return (
    <div className={Styles.userProfile}>
      <div className={Styles.userInfoWrapper}>
        <Image
          className={Styles?.avatar}
          src={userInfo?.avatar} // 이미지 파일의 경로
          alt="My Image"
          width={200} // 이미지 가로 크기
          height={200} // 이미지 세로 크기
        />
        <div className={`${Styles.status} ${getStatusColor(userInfo.status as UserStatus)}`}>{userInfo.status}</div>
        <div className={Styles.username}>{userInfo.name}</div>
        <div className={Styles.stats}>
          <ul>
            <li><span>WIN: {userInfo.ladder_wins}</span></li>
            <li><span>LOSE: {userInfo.ladder_losses}</span></li>
            <li><span>LADDER: {userInfo.rating}</span></li>
          </ul>
        </div>
      </div>
      <button className={Styles.editButton}>EDIT MY INFO</button>
    </div>
  )
}

function getStatusColor(status: UserStatus) {
  switch (status) {
    case UserStatus.ONLINE:
      return Styles.online;
    case UserStatus.OFFLINE:
      return Styles.offline;
    case UserStatus.INGAME:
      return Styles.inGame;
  }
}

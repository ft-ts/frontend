'use client';

import styles from './userProfile.page.module.scss'
import Image from "next/image";
import EditMyProfile from './Components/userProfile.edit';
import ProfileButton from './Components/userProfile.button';
import { UserStatus } from '../../enum/UserStatus.enum';
import { getStatusColor } from '../Common/right-wrapper.utils';
import { User } from '../../interface/User.interface';


export default function UserProfile(
  {
    user,
    isMe,
  }:{
    user: User
    isMe: boolean
  }) 
  {

  return (
    <div className={styles.userProfile}>
      <div className={styles.userInfoWrapper}>
        <Image
          className={styles.avatar}
          src={user.avatar}
          alt="My Image"
          width={200}
          height={200}
        />
        <div className={`${styles.status} ${getStatusColor(user.status as UserStatus)}`}>{user.status}</div>
        <div className={styles.username}>{user.name}</div>
        <div className={styles.stats}>
          <ul>
            <li><span>WIN: {user.ladder_wins}</span></li>
            <li><span>LOSE: {user.ladder_losses}</span></li>
            <li><span>LADDER: {user.rating}</span></li>
          </ul>
        </div>
      </div>
      {isMe ? <EditMyProfile /> : <ProfileButton user={user} />}
    </div>
  )
}


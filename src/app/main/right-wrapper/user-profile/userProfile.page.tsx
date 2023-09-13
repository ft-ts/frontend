'use client';

import styles from './userProfile.page.module.scss'
import Profile from './Components/userProfile.profile';
import EditMyProfile from './Components/userProfile.edit';
import ProfileButton from './Components/userProfile.button';
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
    <div>
      <Profile user={user} />
      <div className={styles.userProfile}>
        {isMe ? <EditMyProfile /> : <ProfileButton user={user} />}
      </div>
    </div>
  )
}


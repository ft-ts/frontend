'use client';

import styles from './userProfile.page.module.scss'
import Profile from './Components/userProfile.profile';
import EditMyProfile from './Components/userProfile.edit';
import ProfileButton from './Components/userProfile.button';
import { useGlobalContext } from '@/app/Context/store';
import { useEffect } from 'react';
import { socket } from '@/app/main/components/CheckAuth';
import { UserStatus } from '../../enum/UserStatus.enum';
import { User } from '../../interface/User.interface';

export default function UserProfile() {
  const { currentUser, setCurrentUser }: any = useGlobalContext();
  const { myInfo } : any = useGlobalContext();
    
  useEffect(() => {
    if (myInfo.uid === currentUser.uid)
      setCurrentUser(myInfo);
  }, [myInfo]);

  useEffect(() => {
    socket.on('update/userConnection', (payload : {uid: number, status: UserStatus}) => {
      if (payload.uid === currentUser.uid) {
        setCurrentUser((prevUser: User) => {
            return { ...prevUser, status: payload.status };
        });
      }
    })
  }, [currentUser]);

  return (
    <div className={styles.profileBackground}>
      <Profile user={currentUser} />
      <div className={styles.userProfile}>
        {(myInfo.uid === currentUser.uid) ? <EditMyProfile /> : <ProfileButton user={currentUser} />}
      </div>
    </div>
  )
}


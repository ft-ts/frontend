'use client';

import styles from './userProfile.page.module.scss'
import Profile from './Components/userProfile.profile';
import EditMyProfile from './Components/userProfile.edit';
import ProfileButton from './Components/userProfile.button';
import { useGlobalContext } from '@/app/Context/store';
import { useEffect } from 'react';
import { socket } from '@/app/main/components/CheckAuth';
import { getUserByUid } from '@/app/axios/client';
import { UserStatus } from '../../enum/UserStatus.enum';
import { User } from '../../interface/User.interface';

export default function UserProfile() {
  const { currentUser, setCurrentUser }: any = useGlobalContext();
  const { myInfo }: any = useGlobalContext();
  const { setIsNotificationVisible }: any = useGlobalContext();
  const { setErrorMessage }: any = useGlobalContext();

  useEffect(() => {
    if (myInfo.uid === currentUser.uid)
      setCurrentUser(myInfo);
  }, [myInfo]);

  useEffect(() => {
    socket.on('update/userInfo', (uid: number) => {
      if (uid === currentUser.uid) {
        getUserByUid(uid).then((res) => {
          setCurrentUser(res.data);
        }).catch((err) => {
          setErrorMessage('Failed to get user info');
          setIsNotificationVisible(true);
          setTimeout(() => {
            setIsNotificationVisible(false);
            setErrorMessage('');
          }, 2000);
        });
      }
    });
    return () => {
      socket.off('update/userInfo');
    }
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


'use client';

import styles from './userProfile.page.module.scss'
import Profile from './Components/userProfile.profile';
import EditMyProfile from './Components/userProfile.edit';
import ProfileButton from './Components/userProfile.button';
import { useGlobalContext } from '@/app/Context/store';
import { useEffect } from 'react';

export default function UserProfile() {
  const { currentUser, setCurrentUser }: any = useGlobalContext();
  const { myInfo }: any = useGlobalContext();

  // 프로필 수정시 반영
  useEffect(() => {
    if (myInfo.uid === currentUser.uid)
      setCurrentUser(myInfo);
  }, [myInfo]);

  return (
    <div className={styles.profileBackground}>
      <Profile user={currentUser} />
      <div className={styles.userProfile}>
        {(myInfo.uid === currentUser.uid) ? <EditMyProfile /> : <ProfileButton user={currentUser} />}
      </div>
    </div>
  )
}


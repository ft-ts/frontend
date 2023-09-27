'use client';

import styles from './userProfile.page.module.scss'
import Profile from './Components/userProfile.profile';
import EditMyProfile from './Components/userProfile.edit';
import ProfileButton from './Components/userProfile.button';
import { useGlobalContext } from '@/app/Context/store';
import { useEffect } from 'react';
import { socket } from '@/app/main/components/CheckAuth';
import { getUserByUid, getMyInfo } from '@/app/axios/client';

export default function UserProfile() {
  const { currentUser, setCurrentUser }: any = useGlobalContext();
  const { myInfo, setMyInfo }: any = useGlobalContext();
  const { setIsNotificationVisible }: any = useGlobalContext();
  const { setErrorMessage }: any = useGlobalContext();
  const { userInfoFlag, setUserInfoFlag }: any = useGlobalContext();

  useEffect(() => {
    if (myInfo.uid === currentUser.uid)
      setCurrentUser(myInfo);
  }, [myInfo]);

  useEffect(() => {
    socket.on('update/userInfo', (data:{uid: number}) => {
      console.log('updateUserInfo123', data.uid, myInfo.uid, currentUser.uid);
      if (data.uid === myInfo.uid) {
        console.log('updateMyInfo');
        getMyInfo().then((res) => {
          const { data } = res;
          setMyInfo(data);
        }).catch((err) => {
          setErrorMessage('Failed to get my info');
          setIsNotificationVisible(true);
          setTimeout(() => {
            setIsNotificationVisible(false);
            setErrorMessage('');
          }, 2000);
        });
      } else if (data.uid === currentUser.uid) {
        getUserByUid(data.uid).then((res) => {

          console.log('updateUserInfo', res.data);
          setUserInfoFlag(!userInfoFlag);
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
  }, [currentUser, userInfoFlag]);

  return (
    <div className={styles.profileBackground}>
      <Profile user={currentUser} />
      <div className={styles.userProfile}>
        {(myInfo.uid === currentUser.uid) ? <EditMyProfile /> : <ProfileButton user={currentUser} />}
      </div>
    </div>
  )
}


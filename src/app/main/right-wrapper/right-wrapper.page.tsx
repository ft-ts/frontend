'use-client';

import React, { useState, useEffect } from 'react'
import styles from './right-wrapper.module.scss'
import UserList from './user-list/userList.page'
import UserProfile from './user-profile/userProfile.page'
import { User } from '../interface/User.interface'
import { getMyInfo } from '@/app/axios/client';
import { useGlobalContext } from '@/app/Context/store';

export default function RightWrapper() {

  const { myInfo, setMyInfo } : any = useGlobalContext();
  const [ currentUser, setCurrentUser ] = useState<User>({} as User);
  const [ isMe, setIsMe ] = useState<boolean>(false);

  useEffect(() => {
    getMyInfo().then((res) => {
      const { data } = res;
      setMyInfo(data);
      setCurrentUser(data); 
      setIsMe(true);
    });
  }, []);

  useEffect(() => {
  }, [myInfo, currentUser]);


  return (
      <div className={styles.rightWrapper}>
          <UserProfile user={myInfo} isMe={isMe} />
          <UserList setCurrentUser={setCurrentUser} setIsMe={setIsMe} myInfo={myInfo}/>
      </div>
  )
}
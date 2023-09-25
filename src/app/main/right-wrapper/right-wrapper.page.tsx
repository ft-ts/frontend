'use-client';

import React, {use, useEffect} from 'react'
import styles from './right-wrapper.module.scss'
import UserList from './user-list/userList.page'
import UserProfile from './user-profile/userProfile.page'
import { socket } from '../components/CheckAuth';
import { useGlobalContext } from '@/app/Context/store';

export default function RightWrapper() {

  return (
      <div className={styles.rightWrapper}>
          <UserProfile />
          <UserList />
      </div>
  )
}
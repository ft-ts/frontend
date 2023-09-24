'use-client';

import React from 'react'
import styles from './right-wrapper.module.scss'
import UserList from './user-list/userList.page'
import UserProfile from './user-profile/userProfile.page'
import { RightWrapperContextProvider } from './Context/rightWrapper.store';

export default function RightWrapper() {

  return (
    <div className={styles.rightWrapper}>
      <RightWrapperContextProvider>
        <UserProfile />
        <UserList />
      </RightWrapperContextProvider>
    </div>
  )
}
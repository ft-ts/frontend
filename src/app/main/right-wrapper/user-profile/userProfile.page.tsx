'use client';

import styles from './userProfile.page.module.scss'
import Profile from './Components/userProfile.profile';
import EditMyProfile from './Components/userProfile.edit';
import ProfileButton from './Components/userProfile.button';
import { User } from '../../interface/User.interface';
import { useEffect } from 'react';
import { useGlobalContext } from '@/app/Context/store';

export default function UserProfile({ user, isMe }: { user: User, isMe: boolean }) {
    return (
      <div className={styles.userProfile}>
        <Profile user={user} />
        {isMe ? <EditMyProfile /> : <ProfileButton user={user} />}
      </div>
    );
}


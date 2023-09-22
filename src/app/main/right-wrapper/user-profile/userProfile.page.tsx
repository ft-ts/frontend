'use client';

import styles from './userProfile.page.module.scss'
import Profile from './Components/userProfile.profile';
import EditMyProfile from './Components/userProfile.edit';
import ProfileButton from './Components/userProfile.button';
import { useGlobalContext } from '@/app/Context/store';

export default function UserProfile() {
    const { currentUser }: any = useGlobalContext();
    const { myInfo } : any = useGlobalContext();
    return (
        <div>
            <Profile user={currentUser} />
            <div className={styles.userProfile}>
                {(myInfo.uid === currentUser.uid) ? <EditMyProfile /> : <ProfileButton user={currentUser} />}
            </div>
        </div>
    )
}


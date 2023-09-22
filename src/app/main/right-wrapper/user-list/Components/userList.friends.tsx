'use client';

import React, { useEffect } from 'react';
import styles from './userList.module.scss';
import Image from 'next/image';
import { renderUserStatus } from "../../Common/right-wrapper.utils";
import { UserStatus } from '@/app/main/enum/UserStatus.enum';
import { User } from '@/app/main/interface/User.interface';
import { deleteFriend } from '@/app/axios/client';
import { socket } from '@/app/main/components/CheckAuth';
import { useGlobalContext } from '@/app/Context/store';

const deleteIcon = "/asset/minus.png";
const invite = "/asset/inviteIcon.png";

export default function UserListFriends(
  {
    user,
  }:{
    user: User
  })
  {
    const { setCurrentUser }: any = useGlobalContext();
    const { currentChannelID }: any = useGlobalContext();

    const handleClick = () => {
      setCurrentUser(user);
    };

    const handleDeleteFriend = () => {
      deleteFriend(user.uid).then((res) => {
        /*
          Update Friend List
        */
      }).catch((err) => {
        console.log(err);
      });
    };

    const handleInviteChat = () => {
      console.log('handleInviteChat', currentChannelID);
      if (!currentChannelID) {
        alert('You are not in any channel');
        return;
      } else{
        alert('invite');
        const targetUserUid : number = user.uid;
        const channelID : number = currentChannelID;
        socket.emit('channel/inviteUserToChannel', { targetUid: targetUserUid, channelId: channelID})
      }
    };

    useEffect(() => {
    }, [user]);

  return (
    <div className={styles.userListContainer}>
      <button onClick={handleClick} className={`${styles.userListBox} ${styles.friendWidth}`}>
        {renderUserStatus({userStatus: user.status as UserStatus})}
        <div className={styles.userAvatarBox}>
          <Image src={user.avatar} width={60} height={60} alt={user.name} className={styles.userAvatar}></Image>
        </div>
        <div className={styles.userNameBox}>
          <div className={styles.userName}>{user.name}</div>
        </div>
      </button>
      <div className={styles.userListButtonContainer}>
        <button className={styles.buttonBox}>
          <Image src={deleteIcon} width={40} height={40} alt="deleteFriend" onClick={handleDeleteFriend}></Image>
        </button>
        <button className={styles.buttonBox}>
          <Image src={invite} width={40} height={40} alt="invite" onClick={handleInviteChat}></Image>
        </button>
      </div>
    </div>
  )
}
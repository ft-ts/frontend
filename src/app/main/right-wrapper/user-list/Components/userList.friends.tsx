'use client';

import React, { useEffect } from 'react';
import styles from './userList.module.scss';
import { renderUserStatus } from "../../Common/right-wrapper.utils";
import { UserStatus } from '@/app/main/enum/UserStatus.enum';
import { User } from '@/app/main/interface/User.interface';
import { deleteFriend, postInviteUser} from '@/app/axios/client';
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
    const { currentChannelId }: any = useGlobalContext();

    const handleClick = () => {
      setCurrentUser(user);
    };

    const handleDeleteFriend = () => {
      deleteFriend(user.uid).then((res) => {
        socket.emit('update/friends');
      }).catch((err) => {
        console.log(err);
      });
    };

    const handleInviteChat = () => {
      if (!currentChannelId) {
        alert('You are not in any channel');
        return;
      } else{
        postInviteUser(currentChannelId, user.uid).then((res) => {
          socket.emit('update/channelInfo');
          socket.emit('channel/innerUpdate');
          socket.emit('channel/sendMessage', {
            channelId: currentChannelId,
            content: `${res.data} has been invited to this channel.`,
            isNotice: true,
          });
        }).catch((err) => {
          console.log(err);
        });
      }
    };

  return (
    <div className={styles.userListContainer}>
      <button onClick={handleClick} className={`${styles.userListBox} ${styles.friendWidth}`}>
        {renderUserStatus({userStatus: user.status as UserStatus})}
        <div className={styles.userAvatarBox}>
          <img src={user.avatar} width={60} height={60} alt={user.name} className={styles.userAvatar}/>
        </div>
        <div className={styles.userNameBox}>
          <div className={styles.userName}>{user.name}</div>
        </div>
      </button>
      <div className={styles.userListButtonContainer}>
        <button className={styles.buttonBox}>
          <img src={deleteIcon} width={40} height={40} alt="deleteFriend" onClick={handleDeleteFriend}/>
        </button>
        <button className={styles.buttonBox}>
          <img src={invite} width={40} height={40} alt="invite" onClick={handleInviteChat}/>
        </button>
      </div>
    </div>
  )
}
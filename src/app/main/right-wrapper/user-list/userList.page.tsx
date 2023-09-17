'use client';

import React, { useEffect, useState } from 'react';
import styles from './userList.page.module.scss';
import UserListAll from './Components/userList.all';
import UserListChannel from './Components/userList.channel'
import UserListFriends from './Components/userList.friends';
import MyInfo from './Components/userList.myInfo';
import UserListSearch from './Components/userList.search';
import { User } from '@/app/main/interface/User.interface';
import { getUserListExceptMe, getFreiendsList } from '@/app/api/client';
import { useGlobalContext } from '@/app/Context/store';
import { ChannelUser } from '../../mid-wrapper/chat/interfaces/channelUser.interface';
import { TabOptions } from './userList.enum';

export default function UserList(
  {
    setCurrentUser,
    setIsMe,
    myInfo,
  }:{
    setCurrentUser: React.Dispatch<React.SetStateAction<User>>
    setIsMe: React.Dispatch<React.SetStateAction<boolean>>
    myInfo: User
  })
  {
  const { activeTab, setActiveTab }: any = useGlobalContext();
  const [userList, setUserList] = useState<User[]>([]);
  const [friendList, setFriendList] = useState<User[]>([]);
  const { channelId }: any = useGlobalContext();
  const { channelMembers }: any = useGlobalContext();

  useEffect(() => {
    getUserListExceptMe().then((res) => {
      const { data } = res;
      setUserList(data);
    });
  }, []);

  useEffect(() => {
    getFreiendsList().then((res) => {
      const { data } = res;
      setFriendList(data);
    });
  }, []);

  useEffect(() => {
  }, [userList]);

  useEffect(() => {
  }, [friendList]);

  useEffect(() => {
  }, [channelMembers]);

  const renderUserList = () => {
    if (activeTab === TabOptions.ALL) {
      return renderAllList();
    } else if (activeTab === TabOptions.FRIENDS) {
      return renderFriendsList();
    } else if (activeTab === TabOptions.CHANNEL) {
      return renderChannelList();
    }
  };

  useEffect(() => {
    renderUserList();
  }, [activeTab]);



  const renderAllList = () => {
    return (
      <>
        {userList.map((user: User) => (
          <UserListAll
            key={user.uid}
            user={user}
            myInfo={myInfo}
            setCurrentUser={setCurrentUser}
            setIsMe={setIsMe}
          />
        ))}
      </>
    );
  };

  const renderFriendsList = () => {
    return (
      <>
        {friendList.map((item, index) => (
          <UserListFriends
            key={index}
            user={item}
            myInfo={myInfo}
            setCurrentUser={setCurrentUser}
            setIsMe={setIsMe}
          />
          ))}
      </>
    );
  };
  
  const renderChannelList = () => {
    return (
      <>
        {channelMembers.map((member: ChannelUser) => (
          <UserListChannel 
            key={member.id}
            item={member}
            myInfo={myInfo}
            setCurrentUser={setCurrentUser}
            setIsMe={setIsMe}
           />
        ))}
      </>
    );
  };

  return (
    <div className={styles.userlistContainer}>
      <div className={styles.userList}>
        <div className={styles.userPanelBox}>
          <h2 className={styles.userPanelFont}>Users</h2>
        </div>
        <div className={styles.userListHeader}>
          <div
            className={`${styles.userListHeaderTitle} ${activeTab === TabOptions.ALL ? styles.activeTab : ''
              }`}
            onClick={() => setActiveTab(TabOptions.ALL)}
          >
            All
          </div>
          <div
            className={`${styles.userListHeaderTitle} ${activeTab === TabOptions.FRIENDS ? styles.activeTab : ''
              }`}
            onClick={() => setActiveTab(TabOptions.FRIENDS)}
          >
            Friends
          </div>
          <div
            className={`${styles.userListHeaderTitle} ${activeTab === TabOptions.CHANNEL ? styles.activeTab : undefined
              }`}
            onClick={channelId !== null ? () => setActiveTab(TabOptions.CHANNEL) : undefined
            }
          >
            Channel
          </div>
        </div>
        <UserListSearch />
        <div className={styles.userListBody}>{renderUserList()}</div>
        <MyInfo myInfo={myInfo} setCurrentUser={setCurrentUser} setIsMe={setIsMe}/>
      </div>
    </div>
  );
}

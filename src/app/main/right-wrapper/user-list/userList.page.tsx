'use client';

import React, { useEffect, useState } from 'react';
import styles from './userList.page.module.scss';
import UserListAll from './Components/userList.all';
import UserListChannel from './Components/userList.channel'
import UserListFriends from './Components/userList.friends';
import MyInfo from './Components/userList.myInfo';
import UserListSearch from './Components/userList.search';
import { User } from '@/app/main/interface/User.interface';
import { getUserListExceptMe, getFreiendsList, getChannelMembers } from '@/app/axios/client';
import { useGlobalContext } from '@/app/Context/store';
import { ChannelUser } from '../../mid-wrapper/chat/interfaces/channelUser.interface';
import { TabOptions } from './userList.enum';

export default function UserList()
{
  const [userList, setUserList] = useState<User[]>([]);
  const [friendList, setFriendList] = useState<User[]>([]);
  const [ channelMembers, setChannelMembers ] = useState<ChannelUser[]>([]);

  const { activeTab, setActiveTab }: any = useGlobalContext();
  const { myRole, setMyRole }: any = useGlobalContext();
  const { currentChannelId }: any = useGlobalContext();

  useEffect(() => {
    if (activeTab === TabOptions.ALL) {
      getUserListExceptMe().then((res) => {
        const { data } = res;
        setUserList(data);
      }).catch((err) => {
        console.log(err);
      });
    } else if (activeTab === TabOptions.FRIENDS) {
      getFreiendsList().then((res) => {
        const { data } = res;
        setFriendList(data);
      }).catch((err) => {
        console.log(err);
      });
    } else if (activeTab === TabOptions.CHANNEL) {
      if (currentChannelId){
        getChannelMembers(currentChannelId).then((res) => {
          const { data } = res;
          setChannelMembers(data);
        }).catch((err) => {
          console.log(err);
        });
      }
    }
  }, [activeTab]);

  useEffect(() => {
    if (currentChannelId){
      getChannelMembers(currentChannelId).then((res) => {
        const { data } = res;
        setChannelMembers(data);
      }).catch((err) => {
        console.log(err);
      });
    }
  }, [currentChannelId]);

  const renderUserList = () => {
    if (activeTab === TabOptions.ALL) {
      return renderAllList();
    } else if (activeTab === TabOptions.FRIENDS) {
      return renderFriendsList();
    } else if (activeTab === TabOptions.CHANNEL) {
      return renderChannelList();
    }
  };

  const renderAllList = () => {
    return (
      <>
        {userList?.map && userList.map((user: User) => (
          <UserListAll
            key={user.uid}
            user={user}
          />
        ))}
      </>
    );
  };

  const renderFriendsList = () => {
    return (
      <>
        {friendList?.map && friendList.map((item, index) => (
          <UserListFriends
            key={index}
            user={item}
          />
          ))}
      </>
    );
  };
  
  const renderChannelList = () => {
    return (
      <>
        {channelMembers?.map && channelMembers.map((member: ChannelUser) => (
          <UserListChannel 
            key={member.id}
            item={member}
            myRole={myRole}
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
            onClick={currentChannelId !== null ? () => setActiveTab(TabOptions.CHANNEL) : undefined
            }
          >
            Channel
          </div>
        </div>
        <UserListSearch />
        <div className={styles.userListBody}>{renderUserList()}</div>
        <MyInfo />
      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import styles from './userList.page.module.scss';
import UserListAll from './Components/userList.all';
import UserListChannel from './Components/userList.channel'
import UserListFriends from './Components/userList.friends';
import MyInfo from './Components/userList.myInfo';
import UserListSearch from './Components/userList.search';
import { User } from '@/app/main/interface/User.interface';
import { getUserListExceptMe, getFreiendsList as getFriendsList, getChannelMembers } from '@/app/axios/client';
import { useGlobalContext } from '@/app/Context/store';
import { ChannelUser } from '../../mid-wrapper/chat/interfaces/channelUser.interface';
import { TabOptions } from './userList.enum';
import { socket } from '@/app/main/components/CheckAuth';

export default function UserList(){
  const [userList, setUserList] = useState<User[]>([]);
  const [friendList, setFriendList] = useState<User[]>([]);
  const [ channelMembers, setChannelMembers ] = useState<ChannelUser[]>([]);

  const { activeTab, setActiveTab }: any = useGlobalContext();
  const { myRole }: any = useGlobalContext();
  const { currentChannelId }: any = useGlobalContext();
  const { isNotificationVisible, setIsNotificationVisible }: any = useGlobalContext();
  const { errorMessage, setErrorMessage }: any = useGlobalContext();

  const setUserLists = () => {
    if (activeTab === TabOptions.ALL) {
      getUserListExceptMe().then((res) => {
        const { data } = res;
        setUserList(data);
      }).catch((err) => {
        setErrorMessage(err);
        setIsNotificationVisible(true);
        setTimeout(() => {
          setIsNotificationVisible(false);
        }, 3000);
      });
    } else if (activeTab === TabOptions.FRIENDS) {
      getFriendsList().then((res) => {
        const { data } = res;
        setFriendList(data);
      }).catch((err) => {
        setErrorMessage(err);
        setIsNotificationVisible(true);
        setTimeout(() => {
          setIsNotificationVisible(false);
        }, 3000);
      });
    } else if (activeTab === TabOptions.CHANNEL) {
      if (currentChannelId){
        getChannelMembers(currentChannelId).then((res) => {
          const { data } = res;
          setChannelMembers(data);
        }).catch((err) => {
          setErrorMessage(err);
          setIsNotificationVisible(true);
          setTimeout(() => {
            setIsNotificationVisible(false);
          }, 3000);
        });
      }
    }
  }

  useEffect(() => {
    setUserLists();
  }, [activeTab]);

  useEffect(() => {
    socket.on('update/friends', () => {
      if (activeTab !== TabOptions.FRIENDS){
        setActiveTab(TabOptions.FRIENDS);
        return ;
      }
      setUserLists();
    });
    socket.on('update/userConnection', () => {
      if (activeTab === TabOptions.ALL){
        setUserLists();
      }
    });
    socket.on('channel/innerUpdate', () => {
      if (activeTab === TabOptions.CHANNEL){
        setUserLists();
      }
    });
    return () => {
      socket.off('update/friends');
      socket.off('update/userConnection');
      socket.off('channels/grant');
      socket.off('channel/innerUpdate');
    }
  }, [activeTab]);

  useEffect(() => {
    if (currentChannelId){
      getChannelMembers(currentChannelId).then((res) => {
        const { data } = res;
        setChannelMembers(data);
      }).catch((err) => {
        setErrorMessage(err);
        setIsNotificationVisible(true);
        setTimeout(() => {
          setIsNotificationVisible(false);
        }, 3000);
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

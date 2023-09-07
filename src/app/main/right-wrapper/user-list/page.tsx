"use client";

import { useEffect, useState } from "react";
import { UserListItem } from "./Components/userListItem";
import styles from "./userList.module.scss";
import Image from "next/image";
import { UserStatus } from "../../enum/UserStatus.enum";
import { UserMenu } from "./Components/userMenu";
import { User } from "../../interface/User.interface";
import { getUserListExceptMe, getFreiendsList } from "@/app/api/client";
import { useGlobalContext } from "@/app/Context/store";
import { ChannelUser } from "../../mid-wrapper/chat/interfaces/channelUser.interface";
import { ChannelMembersItem } from "../../right-wrapper/user-list/Components/channelMembersItem"
import { TabOptions } from "./userList.enum";
import { FriendsListItem } from "./Components/friendsListItem";
import { getStatusColor } from "./userList.utils";

const logoutIcon = "/asset/logoutIcon.png";

export default function UserList() {
  const { activeTab, setActiveTab }: any = useGlobalContext();
  const [userList, setUserList] = useState<User[]>([]);
  const [friendList, setFriendList] = useState<User[]>([]);
  const [menuOn, setMenuOn] = useState<Boolean>(false);
  const [selectedUser, setSelectedUser] = useState<{name: String, uid: Number}>({name: "", uid: 0});
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
      console.log("data", data);
      setFriendList(data);
    });
  }, []);

  useEffect(() => {
  }, [userList]);

  useEffect(() => {
  }, [friendList]);

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
          <UserListItem
            key={user.uid}
            user={user}
            state={[menuOn, setMenuOn, selectedUser, setSelectedUser]}
          />
        ))}
      </>
    );
  };

  const renderFriendsList = () => {
    return (
      <>
        {userList.map((item, index) => (
          <FriendsListItem
            key={index}
            user={item}
            state={[menuOn, setMenuOn, selectedUser, setSelectedUser]}
          />
          ))}
      </>
    );
  };
  
  const renderChannelList = () => {
    return (
      <>
        {channelMembers.map((member: ChannelUser) => (
          <ChannelMembersItem 
            key={member.id}
            item={member}
            state={[menuOn, setMenuOn, selectedUser, setSelectedUser]}
           />
        ))}
      </>
    );
  };

  return (
    <div className={styles.userlistContainer}>
      {menuOn && <UserMenu user={selectedUser} setMenuOn={setMenuOn} />}
      <div className={styles.userList}>
        <div className={styles.userPanelBox}>
          <h2 className={styles.userPanelFont}>Users</h2>
        </div>
        <div className={styles.userListHeader}>
          <div
            className={`${styles.userListHeaderTitle} ${activeTab === TabOptions.ALL ? styles.activeTab : ""
              }`}
            onClick={() => setActiveTab(TabOptions.ALL)}
          >
            All
          </div>
          <div
            className={`${styles.userListHeaderTitle} ${activeTab === TabOptions.FRIENDS ? styles.activeTab : ""
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
        <DisplayUserSearch />
        <div className={styles.userListBody}>{renderUserList()}</div>
        <MyInfo />
      </div>
    </div>
  );
}

const logout = () => {
  console.log('logout');
}

const MyInfo = () => {
  const { myInfo }: any = useGlobalContext();

  return (
    <div className={styles.bottomMyInfo}>
      <div className={styles.myAvatarBox}>
        <Image className={styles.myAvatar} src={myInfo.avatar} alt={myInfo.name} width={80} height={80} />
      </div>
      <div className={styles.myNameBox}>
        <h2 className={styles.myName}>{myInfo.name}</h2>
      </div>
      <div className={styles.myStatusBox}>
        <div className={`styles.userStatus ${getStatusColor(myInfo.status as UserStatus)}`}>{myInfo.status}</div>
      </div>
      <button className={styles.logoutBox} onClick={logout}>
        <Image className={styles.logoutIcon} src={logoutIcon} alt="logout" width={50} height={80}/>
      </button>
    </div>
  );
};

const DisplayUserSearch = (props: {}) => {
  return (
    <div className={styles.userSearchContainer}>
      <input className={styles.userSearchInput}></input>
      <button className={styles.userSearchIconContainer}>
        <Image
          className={styles.userSearchIcon}
          src="/asset/search.png"
          alt="searchUser"
          width={30}
          height={30}
        />
      </button>
    </div>
  );
};


"use client";

import { useEffect, useState } from "react";
import { UserListItem } from "./Components/UserListItem";
import Styles from "./UserList.module.scss";
import Image from "next/image";
import { UserStatus } from "../../enum/UserStatus.enum";
import { UserMenu } from "./Components/UserMenu";
import { User } from "../../interface/User.interface";
import { getUserList } from "@/app/api/client";
import { useGlobalContext } from "@/app/Context/store";
import { ChannelUser } from "../../mid-wrapper/chat/interfaces/channelUser.interface";
import { ChannelMembersItem } from "../../right-wrapper/user-list/Components/channelMembersItem"
import { socket } from "../../components/CheckAuth";

enum TabOptions {
  ALL = "ALL",
  FRIENDS = "FRIENDS",
  CHANNEL = "CHANNEL",
}

export default function UserList() {
  const { activeTab, setActiveTab }: any = useGlobalContext();
  const [userList, setUserList] = useState<User[]>([]);
  const [menuOn, setMenuOn] = useState<Boolean>(false);
  const [selectedUser, setSelectedUser] = useState<{name: String, uid: Number}>({name: "", uid: 0});
  const { channelId }: any = useGlobalContext();
  const { channelMembers }: any = useGlobalContext();

  useEffect(() => {
    getUserList().then((res) => {
      setUserList(res.data);
    });
  }, []);

  useEffect(() => {
  }, [userList]);


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
        {userList.map((item, index) => (
          <UserListItem key={index} item={item} state={[menuOn, setMenuOn, selectedUser, setSelectedUser]} />
        ))}
      </>
    );
  };

  const renderFriendsList = () => {
    return (
      <>
        {userList.map((item, index) => (
          <UserListItem key={index} item={item} state={[menuOn, setMenuOn, selectedUser, setSelectedUser]} />
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
            id={member.id}
            user={member.user}
            joined_at={member.joined_at}
            role={member.role}
           />
        ))}
      </>
    );
  };

  return (
    <div className={Styles.userlistWrapper}>
      {menuOn && <UserMenu user={selectedUser} setMenuOn={setMenuOn} />}
      <div className={Styles.userList}>
        <div className={Styles.userPanelBox}>
          <h2 className={Styles.userPanelFont}>Users</h2>
        </div>
        <div className={Styles.userListHeader}>
          <div
            className={`${Styles.userListHeaderTitle} ${activeTab === TabOptions.ALL ? Styles.activeTab : ""
              }`}
            onClick={() => setActiveTab(TabOptions.ALL)}
          >
            All
          </div>
          <div
            className={`${Styles.userListHeaderTitle} ${activeTab === TabOptions.FRIENDS ? Styles.activeTab : ""
              }`}
            onClick={() => setActiveTab(TabOptions.FRIENDS)}
          >
            Friends
          </div>
          <div
            className={`${Styles.userListHeaderTitle} ${activeTab === TabOptions.CHANNEL ? Styles.activeTab : undefined
              }`}
            onClick={channelId !== null ? () => setActiveTab(TabOptions.CHANNEL) : undefined
            }
          >
            Channel
          </div>
        </div>
        <DisplayUserSearch />
        <div className={Styles.userListBody}>{renderUserList()}</div>
        <MyInfo />
      </div>
    </div>
  );
}

const MyInfo = () => {
  const { myInfo }: any = useGlobalContext();

  return (
    <div className={Styles.bottomMyInfo}>
      <Image className={Styles.bottomMyInfoAvatar}
        src={myInfo.avatar}
        alt="avatar"
        width={70}
        height={70}
      />
      <div className={Styles.bottomMyInfoName}>{myInfo.name}</div>
      <div className={Styles.bottomMyInfoStatus}>{myInfo.status}</div>
    </div>
  );
};

const DisplayUserSearch = (props: {}) => {
  return (
    <div className={Styles.userSearchContainer}>
      <input className={Styles.userSearchInput}></input>
      <button className={Styles.userSearchIconContainer}>
        <Image
          className={Styles.userSearchIcon}
          src="/asset/search.png"
          alt="searchUser"
          width={30}
          height={30}
        />
      </button>
    </div>
  );
};

// 가져옴
function getStatusColor(status: UserStatus) {
  switch (status) {
    case UserStatus.ONLINE:
      return Styles.online;
    case UserStatus.OFFLINE:
      return Styles.offline;
    case UserStatus.IN_GAME:
      return Styles.inGame;
  }
}
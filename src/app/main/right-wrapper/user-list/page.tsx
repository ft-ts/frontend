"use client";

import { useEffect, useState } from "react";
import { UserListItem } from "./Components/UserListItem";
import Styles from "./UserList.module.scss";
import Image from "next/image";
import { UserStatus } from "../../enum/UserStatus.enum";
import { UserMenu } from "./Components/UserMenu";
import { User } from "../../interface/User.interface";
import { getUserList } from "@/app/api/client";

enum TabOptions {
  ALL = "ALL",
  FRIENDS = "FRIENDS",
  CHANNEL = "CHANNEL",
}

export default function UserList({ channelId }: { channelId: number | null }) {
  const [activeTab, setActiveTab] = useState(TabOptions.ALL);
  const [userList, setUserList] = useState<User[]>([]);
  const [menuOn, setMenuOn] = useState<Boolean>(false);
  const [selectedUser, setSelectedUser] = useState<{name: String, uid: Number}>({name: "", uid: 0});

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
        {userList.map((item, index) => (
          <UserListItem key={index} item={item} state={[menuOn, setMenuOn, selectedUser, setSelectedUser]} />
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
            className={`${Styles.userListHeaderTitle} ${activeTab === TabOptions.CHANNEL ? Styles.activeTab : ""
              }`}
            onClick={() => setActiveTab(TabOptions.CHANNEL)}
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

const MyInfo = (props: {}) => {
  return (
    <div className={Styles.bottomMyInfo}>
      <div className={Styles.bottomMyInfoAvatar}></div>
      <div className={Styles.bottomMyInfoName}>DOHYULEE</div>
      <div className={Styles.bottomMyInfoStatus}>ONLINE</div>
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

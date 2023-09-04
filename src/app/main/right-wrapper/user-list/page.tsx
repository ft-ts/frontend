"use client";

import { useState } from "react";
import { UserListItem } from "./Components/UserListItem";
import styles from "./user-list.module.scss";
import Image from "next/image";

enum TabOptions {
  ALL = "ALL",
  FRIENDS = "FRIENDS",
  CHANNEL = "CHANNEL",
}

export default function UserList() {
  const [activeTab, setActiveTab] = useState(TabOptions.ALL);

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
    // Render the All list
    return (
      <>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((item, index) => (
          <UserListItem key={index} />
        ))}
      </>
    );
  };

  const renderFriendsList = () => {
    return (
      <>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((item, index) => (
          <UserListItem key={index} />
        ))}
      </>
    );
  };

  const renderChannelList = () => {
    return (
      <>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((item, index) => (
          <UserListItem key={index} />
        ))}
      </>
    );
  };

  return (
    <div className={styles.userList}>
      <div className={styles.userPanelBox}>
        <h2 className={styles.userPanelFont}>Users</h2>
      </div>
      <div className={styles.userListHeader}>
        <div
          className={`${styles.userListHeaderTitle} ${
            activeTab === TabOptions.ALL ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab(TabOptions.ALL)}
        >
          All
        </div>
        <div
          className={`${styles.userListHeaderTitle} ${
            activeTab === TabOptions.FRIENDS ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab(TabOptions.FRIENDS)}
        >
          Friends
        </div>
        <div
          className={`${styles.userListHeaderTitle} ${
            activeTab === TabOptions.CHANNEL ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab(TabOptions.CHANNEL)}
        >
          Channel
        </div>
      </div>
      <DisplayUserSearch />
      <div className={styles.userListBody}>{renderUserList()}</div>
      <MyInfo />
    </div>
  );
}

const MyInfo = (props: {}) => {
  return (
    <div className={styles.bottomMyInfo}>
      <div className={styles.myInfoAvatar}></div>
      <div className={styles.myInfoName}>DOHYULEE</div>
      <div className={styles.myInfoStatus}>ONLINE</div>
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

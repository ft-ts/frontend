"use client";

import React, {useState} from "react";
import styles from "./channel.module.scss";
import { DmItem } from "./channelItem";
import { UserStatus } from "./enum/channel.enum";
import Image from "next/image";

export default function Dms() {
  const [selectedDm, setSelectedDm] = useState<(targetUid: number) => void>();
  // fetch('http://localhost:10000/dm/with/:targetName', {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     // 'Authorization': 'Bearer ' + 
  //     // localStorage.getItem('accessToken'),
  //   },
  // })
  // .then((res) => res.json())
  // .then((res) => {
  //   setSelectedDm(res);
  // })
  
  const handleDmClick = (targetUid: number) => {
    console.log(`Clicked on DM with targetUid: ${targetUid}`);
    
    console.log(selectedDm);
    // 여기에서 클릭한 DM 아이템의 targetUid를 처리하는 로직을 추가할 수 있습니다.
  };

  return (
    <div>
      <DmPanels />
      <DisplayDmSearch />
      <div className={styles.channelContainer}>
      <div className={styles.channelList}>
      <DmItem
        friend="Friend 1"
        profile="/asset/profile_dumy.png" state={UserStatus.ONLINE}
        targetUid={1}
        onClick={handleDmClick}
      />
      </div>
      </div>
    </div>
  );
}

const DisplayDmSearch = (props: {}) => {
  return (
    <div className={styles.channelSearchContainer}>
      <input className={styles.channelSearchInput}></input>
      <button className={styles.channelSearchIconContainer}>
        <Image
          className={styles.channelSearchIcon}
          src="/asset/search.png"
          alt="searchDm"
          width={30}
          height={30}
        />
      </button>
    </div>
  );
};

const DmPanels = (props: {}) => {
  return (
    <div>
      <div className={styles.channelPanelBox}>
        <h2 className={styles.channelPanelFont}>Direct Messages</h2>
      </div>
    </div>
  );
};

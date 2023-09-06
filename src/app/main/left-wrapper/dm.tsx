"use client";

import React, { useEffect, useState } from "react";
import styles from "./channel.module.scss";
import { DmItem } from "./channelItem";
import Image from "next/image";
import { UserStatus } from "../enum/UserStatus.enum";
import { useGlobalContext } from "@/app/Context/store";
import { getDmLists, getDm } from "@/app/api/client";

export default function Dms() {
  const { selectedDm, setSelectedDm }: any = useGlobalContext();
  const [dmLists, setDmLists] = useState<any[]>([]);

  const handleDmClick = (targetUid: number) => {
    console.log(`Clicked on DM with targetUid: ${targetUid}`);

    console.log(selectedDm);
    getDm(targetUid).then((res) => {
      setSelectedDm(res.data);
    });
    // 여기에서 클릭한 DM 아이템의 targetUid를 처리하는 로직을 추가할 수 있습니다.
  };


  useEffect(() => {
    getDmLists().then((res) => {
      setDmLists(res.data);
      console.log(dmLists);
    });
  }, []);

  return (
    <div>
      <DmPanels />
      <DisplayDmSearch />
      <div className={styles.channelContainer}>
      <div className={styles.channelList}>
        {dmLists &&
          dmLists.map((dm) => (
            <DmItem
            friend={dm.friend}
            profile={dm.avatar} state={UserStatus.ONLINE}
            targetUid={dm.targetUid}
            onClick={() => handleDmClick(dm.targetUid)}
            />
          ))}
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

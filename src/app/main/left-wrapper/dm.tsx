"use client";

import React, { useEffect, useState } from "react";
import styles from "./channel.module.scss";
import { DmItem } from "./channelItem";
import Image from "next/image";
import { useGlobalContext } from "@/app/Context/store";
import DmItemProps from "./interfaces/dmItemProps";

export default function Dms() {
  const { dmId, setDmId }: any = useGlobalContext();
  const { dmList, setDmList }: any = useGlobalContext();

  const handleDmClick = (targetUid: number) => {
    setDmId(targetUid);
    console.log(dmId);
  };

  return (
    <div>
      <DmPanels />
      <DisplayDmSearch />
      <div className={styles.dmContainer}>
        {dmList?.map &&
          dmList.map((dm: DmItemProps) => (
            <DmItem
              key={dm.targetUid}
              targetUid={dm.targetUid}
              name={dm.name}
              avatar={dm.avatar}
              status={dm.status}
              onClick={handleDmClick}
            />
          ))}
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

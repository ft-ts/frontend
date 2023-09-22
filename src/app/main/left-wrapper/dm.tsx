"use client";

import React, { useEffect, useState } from "react";
import styles from "./channel.module.scss";
import { DmItem } from "./channelItem";
import Image from "next/image";
import { useGlobalContext, TabOptions } from "@/app/Context/store";
import { DmListProps } from "./interfaces/dmItemProps";
import { getDmLists, getUserByUid, postDmRead } from "@/app/axios/client";

export default function Dms() {
  const { setCurrentChannelId }: any = useGlobalContext();
  const { setCurrentDmId }: any = useGlobalContext();
  const { setCurrentUser } : any = useGlobalContext();
  const { setActiveTab }: any = useGlobalContext();
  const { myInfo } : any = useGlobalContext();
  const { dmList, setDmList }: any = useGlobalContext();

  useEffect(() => {
    if (myInfo.uid === 1000){
      return;
    }
    getDmLists().then((res) => {
      res.data.forEach((dm: DmListProps) => {
        if (dmList.some((dmItem: DmListProps) => dmItem.user_uid === dm.user_uid)) {
          return;
        }
        setDmList((prev: DmListProps[]) => [...prev, dm]);
      });
    }).catch((err) => {
      console.log('getDmLists error : ', err);
    });
  }, [myInfo]);

  const handleDmClick = (targetUid: number) => {
    setActiveTab(TabOptions.ALL);
    setCurrentChannelId(null);
    setCurrentDmId(targetUid);
    getUserByUid(targetUid)
    .then((res) => {
      const { data } = res;
      setCurrentUser(data);
    }). catch((err) => {
      console.log('getUserByUid error : ', err);
    });
    postDmRead(targetUid)
    .catch((err) => {
      console.log('postDmRead error : ', err);
    });
    dmList.forEach((dm: DmListProps) => {
      if (dm.user_uid === targetUid) {
        dm.unread_count = 0;
      }
    });
  };

  useEffect(() => {
  }, [dmList]);

  return (
    <div>
      <DmPanels />
      <DisplayDmSearch />
      <div className={styles.dmContainer}>
        { dmList?.map &&
          dmList.map((dm: DmListProps) => {
            return (
              <DmItem
                key={dm.user_uid}
                props={dm}
                onClick={() => handleDmClick(dm.user_uid)}
              />
            );
          })}
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
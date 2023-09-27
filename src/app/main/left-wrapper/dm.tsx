'use client';

import React, { useEffect, useState } from 'react';
import styles from './channel.module.scss';
import { DmItem } from './channelItem';
import { useGlobalContext, TabOptions } from '@/app/Context/store';
import { DmListProps } from './interfaces/dmItemProps';
import { getDmLists, getUserByUid, postDmRead } from '@/app/axios/client';

export default function Dms() {
  const { setCurrentChannelId }: any = useGlobalContext();
  const { currentDmId, setCurrentDmId }: any = useGlobalContext();
  const { setCurrentUser } : any = useGlobalContext();
  const { setActiveTab }: any = useGlobalContext();
  const { myInfo } : any = useGlobalContext();
  const { dmList, setDmList }: any = useGlobalContext();
  const { setIsNotificationVisible }: any = useGlobalContext();
  const { setErrorMessage }: any = useGlobalContext();
  const { initFlag }: any = useGlobalContext();

  useEffect(() => {
    if (myInfo.uid === 1000){
      return;
    }
    getDmLists().then((res) => {
      res.data.forEach((dm: DmListProps) => {
        if (dmList.some((dmItem: DmListProps) =>(dmItem.user_uid === dm.user_uid))) {
          return;
        }
        setDmList((prev: DmListProps[]) => [...prev, dm]);
      });
    }).catch((err) => {
      setErrorMessage('Failed to get dm list');
      setIsNotificationVisible(true);
      setTimeout(() => {
        setIsNotificationVisible(false);
        setErrorMessage('');
      }, 2000);
    });
  }, [initFlag]);

  const handleDmClick = (targetUid: number) => {
    if (currentDmId && targetUid === currentDmId) return ;
    setActiveTab(TabOptions.ALL);
    setCurrentChannelId(null);
    setCurrentDmId(targetUid);
    getUserByUid(targetUid).then((res) => {
      const { data } = res;
      setCurrentUser(data);
    }). catch((err) => {
      setErrorMessage('User not found.');
      setIsNotificationVisible(true);
      setTimeout(() => {
        setIsNotificationVisible(false);
        setErrorMessage('');
      }, 2000);
    });
    postDmRead(targetUid)
    .catch((err) => {
      setErrorMessage('Failed to read dm.');
      setIsNotificationVisible(true);
      setTimeout(() => {
        setIsNotificationVisible(false);
        setErrorMessage('');
      }, 2000);
    });
    dmList.forEach((dm: DmListProps) => {
      if (dm.user_uid === targetUid) {
        dm.unread_count = 0;
      }
    });
  };

  return (
    <div>
      <DmPanels />
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

const DmPanels = () => {
  return (
    <div>
      <div className={styles.channelPanelBox}>
        <h2 className={styles.channelPanelFont}>Direct Messages</h2>
      </div>
    </div>
  );
};
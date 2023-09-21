'use clinet';

import React, {useState, useEffect } from 'react';
import styles from './userList.module.scss';
import { socket } from '@/app/main/components/CheckAuth';
import { postBanUser } from '@/app/axios/client';

export default function SetBanType(
  {
    handleCloseModal,
    channelId,
    userUid,
  }:{
    handleCloseModal: () => void
    channelId: number
    userUid: number
  }
) {
  const [kick, setKick] = useState(true);
  const [ban, setBan] = useState(false);

  const handleKick = () => {
    setKick(!kick);
    if (ban) setBan(false);
  }

  const handleBan = () => {
    setBan(!ban);
    if (kick) setKick(false);
  }

  useEffect(() => {
  }, [kick, ban]);

  const handleOK = () => {
    const targetUserUid : number = userUid;
    const channelID : number = channelId;
    console.log('targetUserUid : ', targetUserUid);
    console.log('channelID : ', channelID);
    
    if (kick) {
      // socket.emit('channel/kickMember', {targetUserUid: targetUserUid, channelID: channelID});
    }
    else {
      // ban
      // socket.emit('channel/banMember', {targetUserUid: targetUserUid, channelID: channelID});
      postBanUser(targetUserUid, channelID);
    }
    handleCloseModal();
  }

  const handleCancel = () => {
    handleCloseModal();
  }

  return (
    <div>
      <div className={styles.banModalBox}>
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              value="Kick"
              checked={kick}
              onChange={handleKick}
            />
            <h2 className={styles.banModalFont}>
              Kick
            </h2>
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              value="Ban"
              checked={ban}
              onChange={handleBan}
            />
            <h2 className={styles.banModalFont}>
              Ban
            </h2>
          </label>
        </div>
      </div>
      <div className={styles.banButtonContainer}>
        <button onClick={handleOK} className={styles.banButtonBox}>
          <h2 className={styles.banModalFont}>OK</h2>
        </button>
        <button onClick={handleCancel} className={styles.banButtonBox}>
          <h2 className={styles.banModalFont}>Cancel</h2>
        </button>
      </div>
    </div>
  );
}
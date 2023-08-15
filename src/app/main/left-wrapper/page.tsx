"use client"

import styles from "./channel.module.scss";
import React from 'react';
import Channels from './channel';
import Dms from './dm';

interface LeftWrapperProps {
  setChannelId: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function leftWrapper({ setChannelId }: LeftWrapperProps) {
  return (
    <div className={styles.leftWrapper}>
      <Channels setChannelId={setChannelId}/>
      <Dms/>
    </div>
  );
}

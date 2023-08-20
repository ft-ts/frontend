"use client";

import styles from "./channel.module.scss";
import React from 'react';
import Channels from './channel';
import Dms from './dm';

interface LeftWrapperProps {
  channelId: number | null;
  setChannelId: React.Dispatch<React.SetStateAction<number | null>>;
}

function LeftWrapper(props: LeftWrapperProps) {
  return (
    <div className={styles.leftWrapper}>
      <Channels channelId={props.channelId} setChannelId={props.setChannelId}/>
      <Dms/>
    </div>
  );
}

export default LeftWrapper;

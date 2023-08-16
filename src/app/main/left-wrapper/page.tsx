"use client";

import styles from "./channel.module.scss";
import React from 'react';
import Channels from './channel';
import Dms from './dm';

interface LeftWrapperProps {
  setChannelId: React.Dispatch<React.SetStateAction<number | null>>;
}

function LeftWrapper(props: LeftWrapperProps | any) {
  return (
    <div className={styles.leftWrapper}>
      <Channels setChannelId={props.setChannelId}/>
      <Dms/>
    </div>
  );
}

export default LeftWrapper;

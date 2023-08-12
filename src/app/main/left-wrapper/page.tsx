"use client"

import styles from "./channel.module.scss";
import React from 'react';
import Channels from './channel';
import Dms from './dm';


export default function leftWrapper() {
  return (
    <div className={styles.leftWrapper}>
      <Channels/>
      <Dms/>
    </div>
  );
}

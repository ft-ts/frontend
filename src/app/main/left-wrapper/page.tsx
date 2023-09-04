"use client";

import styles from "./channel.module.scss";
import React from 'react';
import Channels from './channel';
import Dms from './dm';

function LeftWrapper() {
  return (
    <div className={styles.leftWrapper}>
      <Channels />
      <Dms/>
    </div>
  );
}

export default LeftWrapper;

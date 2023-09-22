"use client";

import React from 'react';
import styles from "./channel.module.scss";
import Channels from './channel';
import Dms from './dm';

function LeftWrapper() {
  return (
    <div className={styles.leftWrapper}>
      <Channels />
      <Dms />
    </div>
  );
}

export default LeftWrapper;

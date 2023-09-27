'use client';

import React, { useEffect, useState } from 'react';
import styles from './profile.module.scss';
import { User } from '@/app/main/interface/User.interface';

export default function Profile({ user }: { user: User }) {
  const [ladder, setLadder] = useState(true);

  const renderLadder = () => {
    return (
      <div className={styles.statsContainer}>
        <ul>
          <li><h2 className={styles.statsFont}>win : {user.ladder_wins}</h2></li>
          <li><h2 className={styles.statsFont}>lose : {user.ladder_losses}</h2></li>
        </ul>
      </div>
    )
  };

  const renderCustom = () => {
    return (
      <div className={styles.statsContainer}>
        <ul>
          <li><h2 className={styles.statsFont}>win : {user.custom_wins}</h2></li>
          <li><h2 className={styles.statsFont}>lose : {user.custom_losses}</h2></li>
        </ul>
      </div>
    )
  };

  const handleLadder = () => {
    setLadder(true);
  };

  const handleCustom = () => {
    setLadder(false);
  };

  useEffect(() => {
  }, [user]);

  return (
    <div className={styles.userInfoWrapper}>
      <img
        className={styles.avatar}
        src={user.avatar}
        alt={user.name}
      />
      <div className={styles.topContainer}>
        <div className={styles.userNameBox}>
          <h2 className={styles.userName}>{user.name}</h2>
        </div>
      </div>
      <div className={styles.ratingBox}>
        <h2 className={styles.ratingFont}>
          RATING : {user.rating}
        </h2>
      </div>
      <div className={styles.tabContainer}>
        <button className={`${styles.tabBox} ${renderColor(ladder)}`} onClick={handleLadder}>
          <h2 className={styles.tabFont}>Ladder</h2>
        </button>
        <button className={`${styles.tabBox} ${renderColor(!ladder)}`} onClick={handleCustom}>
          <h2 className={styles.tabFont}>Custom</h2>
        </button>
      </div>
      {ladder ? renderLadder() : renderCustom()}
    </div>
  )
}

const renderColor = (flag: boolean) => {
  return flag ? styles.tabBoxActive : styles.tabBox;
}
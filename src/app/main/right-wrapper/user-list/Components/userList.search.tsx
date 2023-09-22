'use client';

import Image from 'next/image';
import styles from './search.module.scss';

export default function UserListSearch() {
  return (
    <div className={styles.userSearchContainer}>
      <input className={styles.userSearchInput}></input>
      <button className={styles.userSearchIconContainer}>
        <img
          className={styles.userSearchIcon}
          src="/asset/search.png"
          alt="searchUser"
          width={30}
          height={30}
        />
      </button>
    </div>
  );
};
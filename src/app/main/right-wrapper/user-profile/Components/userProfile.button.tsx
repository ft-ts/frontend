'use client';

import React from 'react';
import styles from './button.module.scss';
import { User } from '@/app/main/interface/User.interface';
import { socket } from '@/app/main/components/CheckAuth';

export default function ProfileButton(
  {
    user,
  }:{
    user: User
  }
  ){

  const handleAddFriend = () => {
    console.log('handleAddFriend');
  }
  const handleBlock = () => {
    console.log('handleBlock');
  }

  const handleInviteMatch = () => {
    console.log('handleInviteMatch');
  }

  const handleDM = () => {
    console.log('handleDM');
  }


  return (
    <div className={styles.buttonContainer}>
      <button className={styles.buttonBox} onClick={handleAddFriend}></button>
      <button className={styles.buttonBox} onClick={handleDM}></button>
      <button className={styles.buttonBox} onClick={handleInviteMatch}></button>
      <button className={styles.buttonBox} onClick={handleBlock}></button>
    </div>
  )
}
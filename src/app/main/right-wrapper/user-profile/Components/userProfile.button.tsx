'use client';

import React from 'react';
import styles from './button.module.scss';
import Image from 'next/image';
import { User } from '@/app/main/interface/User.interface';
import { socket } from '@/app/main/components/CheckAuth';

const block = "/asset/mute.png";
const addFriend = "/asset/happy.png";
const inviteMatch = "/asset/pongIcon.png";
const dm = "/asset/email.png";

export default function ProfileButton(
  {
    user,
  }:{
    user: User
  }
  ){

  const handleAddFriend = () => {
    console.log('handleAddFriend', user);
  }
  const handleBlock = () => {
    console.log('handleBlock');
  }

  const handleInviteMatch = () => {
    console.log('handleInviteMatch');
    socket.emit('pong/match/invite', { uid: user.uid });
  }

  const handleDM = () => {
    console.log('handleDM');
  }


  return (
    <div className={styles.buttonContainer}>
      <button className={styles.buttonBox} onClick={handleAddFriend}>
        <Image className={styles.imageBox} src={addFriend} alt="addFriend" width={60} height={60}/>
      </button>
      <button className={styles.buttonBox} onClick={handleDM}>
        <Image className={styles.imageBox} src={dm} alt="dm" width={60} height={60}/>
      </button>
      <button className={styles.buttonBox} onClick={handleInviteMatch}>
        <Image className={styles.imageBox} src={inviteMatch} alt="inviteMatch" width={60} height={60}/>
      </button>
      <button className={styles.buttonBox} onClick={handleBlock}>
        <Image className={styles.imageBox} src={block} alt="block" width={60} height={60}/>
      </button>
    </div>
  )
}
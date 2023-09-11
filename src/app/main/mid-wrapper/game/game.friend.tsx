'use-client';

import React, { useState, useEffect } from "react";
import styles from "./gameItem.module.scss";
import { socket } from '../../components/CheckAuth'
import { userInterface } from "./game.interface";
import Image from 'next/image'

export default function GameFriend(
  {
    user,
    isHome,
  } : 
  {
    user: userInterface
    isHome: boolean
  }
) {
  const [isDeny, setIsDeny] = useState<boolean>(false);

  const handleCancle = () => {
    socket.emit('pong/match/invite/cancle', { uid: user.uid });
  }

  const handleBack = () => {
    socket.emit('pong/init');
  }

  const handleAccept = () => {
    socket.emit('pong/match/invite/accept', { uid: user.uid });
  }

  const handleReject = () => {
    socket.emit('pong/match/invite/reject', { uid: user.uid });
  }

  useEffect(() => {
    socket.on('pong/match/invite/reject', ( data : { uid: number }) =>
    {
      setIsDeny(true);
    });

  }, [isDeny]);

  return (
    <div className={styles.inviteContainer}>
      <Image className={styles.inviteAvatar} src={user.avatar} alt="user avatar" width={150} height={150}/>
      <br></br>
      <h2 className={styles.inviteFont}>{user.name}</h2>
      {isHome &&
      <div>
        <div className={styles.blinking}>
          <h2 className={styles.inviteFont}>{isDeny ? "deny yours" : "is wating"}</h2>
        </div>
        <button className={styles.inviteCancleButton} onClick={isDeny ? handleBack : handleCancle}><h2 className={styles.inviteButtonFont}>{isDeny ? "Back" : "Cancle"}</h2></button>
      </div>
      }
      {!isHome && 
      <div>
        <div className={styles.blinking}>
          <h2 className={styles.inviteFont}>invite you</h2>
        </div>
        <div className={styles.inviteButtonContainer}>
          <button className={styles.inviteButton} onClick={handleAccept}><h2 className={styles.inviteButtonFont}>accept</h2></button> 
          <button className={styles.inviteButton} onClick={handleReject}><h2 className={styles.inviteButtonFont}>deny</h2></button>
        </div>
      </div>
      }
    </div>
  )
}
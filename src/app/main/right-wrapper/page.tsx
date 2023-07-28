'use client';

import React, { useEffect, useState } from "react";
import { LargeNumberLike } from 'crypto';
import './right-wrapper.css'
import styles from './user-profile.module.css'
import Image from "next/image"



interface UserProps{
    userProfilePicture: string; // type을 어떻게 할 지 미정
    nickname: string;
    gameState: boolean;
    winCount: number;
    loseCount: number;
    ladder: number;
}

export default function RightWrapper(props: UserProps) {
  return (
    <div id="right-wrapper">
      <h1>RightWrapper</h1>
      <UserProfileBackground  />
      <UserProfileImage />
      <UserProfileName nickname="DOHYULEE" />
      <UserGameState gameState={false} />
    </div>
  )
}

const UserProfileBackground = (props: {}) => {
    return (
        <div className={styles.userProfileBackground}>
        </div>
    )
}

const UserProfileImage = (props: {}) => {
    return (
        <Image src="/asset/profile_dumy.png" 
        className={styles.userProfilePicture}
        width={200}
        height={162}
        quality={100}
         alt="userPicture"/>
    )
}

const UserProfileName = (props: {nickname: string}) => {
    return (
        <div className={styles.userProfileName}>
            <h2>{props.nickname}</h2>
        </div>
    )
}

const UserGameState = ({gameState}: {gameState: boolean}) => {
    
    const [status, setStatus] = useState("");
    const [style, setStyle] = useState({});

    useEffect(() => {
        if (gameState){
            setStatus("In-Game");
            setStyle(styles.GameState);
        }else {
            setStatus("out-of-Game");
            setStyle(styles.outGameState);
        }
    }, [gameState]);
    return (
        <div className={style}>
            <h3>{status}</h3>
        </div>
    )
}
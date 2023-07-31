'use client';

import React, { useEffect, useState } from "react";
import './right-wrapper.css'
import styles from './user-profile.module.css'
import Image from "next/image"
import {UserProfileProps, UserListProps, gameStateProps} from "../userType"
import DisplayUserList from "./userList"
import { on } from "events";


type RightWrapperProps = UserProfileProps & UserListProps;

export default function RightWrapper(props: RightWrapperProps) {
    return (
        <div id="right-wrapper">
            <h1>RightWrapper</h1>
            <DisplayUserProfile {...props} />
            <DisplayUserList {...props} />
        </div>
    )
}

const DisplayUserProfile = (props: UserProfileProps) => {
    return (
        <div>
            <DisplayUserProfileBackground  />
            <DisplayUserProfileImage />
            <DisplayUserProfileName nickname="DOHYULEE" />
            <DisplayUserGameState gameState={true} online={false} />
            <DisplayMatchNumber winCount={30} loseCount={30} />
            <DisplayLadderPoint ladderPoint={1100} />
            <DisplayEditButton />
        </div>
    )
}

const DisplayUserProfileBackground = (props: {}) => {
    return (
        <div className={styles.userProfileBackground}>
        </div>
    )
}

const DisplayUserProfileImage = (props: {}) => {
    return (
        <Image src="/asset/profile_dumy.png" 
        className={styles.userProfilePicture}
        width={200}
        height={162}
        quality={100}
         alt="userPicture"/>
    )
}

const DisplayUserProfileName = (props: {nickname: string}) => {
    return (
        <div className={styles.userProfileName}>
            <h2>{props.nickname}</h2>
        </div>
    )
}


const DisplayUserGameState = (props: gameStateProps) => {
    
    const [status, setStatus] = useState("");
    const [style, setStyle] = useState({});

    useEffect(() => {
        if (props.online){
            console.log(props.online);
            if (props.gameState){
                setStatus("In-Game");
                setStyle(styles.GameState);
            }else {
                setStatus("online");
                setStyle(styles.onlineState);
            }
        }else{
            setStatus("offline");
            setStyle(styles.offlineState)
        }
    }, [props.gameState, props.online]);
    return (
        <div className={style}>
            <h3>{status}</h3>
        </div>
    )
}

const DisplayMatchNumber = (props: {winCount: number, loseCount: number}) => {
    return (
        <div className={styles.userCount}>
            <h3 style={{ marginTop: '0px'}}>Win: {props.winCount}</h3>
            <h3 style={{ marginTop: '0px'}}>Lose: {props.loseCount}</h3>
        </div>
    )
}

const DisplayLadderPoint = (props: {ladderPoint: number}) => {
    return (
        <div className={styles.ladderPoint}>
            <h3>Ladder: {props.ladderPoint}</h3>
        </div>
    )
}

const DisplayEditButton = (props: {}) => {
    return (
        <button className={styles.editButtonRectangle}>
            <h3 className={styles.editButtonFont}>edit my profile</h3>
        </button>
    );
}

export { DisplayUserGameState }

"use-client";

import React, { useState, useEffect} from "react";
import styles from "./gameItem.module.scss";
import { historyInterface } from "./game.interface";

export default function MatchButton(
    {
        setMatchFlag,
        setGameHistory,
        matchFlag, 
    } :
    {
      setMatchFlag:React.Dispatch<React.SetStateAction<boolean>>
      setGameHistory:React.Dispatch<React.SetStateAction<historyInterface>>
      matchFlag: boolean
    }
){
  const handleMatchStart = () => {
    setMatchFlag(true);
    setGameHistory({history : []});
    // socket.emit('pong/ladder/join');
  }
  
  const handleMatchCancle = () => {
    setMatchFlag(false);
    // socket.emit('pong/ladder/leave');
  }
  useEffect(() => {
  }, [matchFlag]);

    return (
      <button className={styles.matchButton} onClick={matchFlag ? handleMatchCancle : handleMatchStart}>
        <h2 className={styles.matchButtonFont}>{matchFlag ? "cancle" : "start match"}</h2>
      </button>
    )
}
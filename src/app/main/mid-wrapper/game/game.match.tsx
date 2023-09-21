"use-client";

import React, { useEffect} from "react";
import styles from "./gameItem.module.scss";
import { historyInterface } from "./game.interface";
import { socket } from '../../components/CheckAuth'

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
    socket.emit('pong/ladder/join');
  }
  
  const handleMatchCancle = () => {
    setMatchFlag(false);
    socket.emit('pong/ladder/cancle');
  }
  useEffect(() => {
  }, [matchFlag]);

    return (
      <button className={styles.matchButton} onClick={matchFlag ? handleMatchCancle : handleMatchStart}>
        <h2 className={styles.matchButtonFont}>{matchFlag ? "cancel" : "start match"}</h2>
      </button>
    )
}
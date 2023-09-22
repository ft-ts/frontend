'use client';

import React, { useState, useEffect } from "react";
import styles from "./gameItem.module.scss";
import { socket } from "../../components/CheckAuth";

export default function GameModal(
  {
    setModalFlag,
    isSuper,
    matchID,
  }:{
    setModalFlag: React.Dispatch<React.SetStateAction<boolean>>
    isSuper: boolean
    matchID: string
  }) {
  const [normal, setNormal] = useState(true);
  const [power, setPower] = useState(false);

  const handleCloseModal = () => {
    const mode : boolean = normal ? true : false;
    socket.emit('pong/game/init', {matchID: matchID, mode: mode});
    setModalFlag(false);
    setNormal(true);
    setPower(false);
  };

  const handleNormal = () => {
    setNormal(!normal);
    if (power) setPower(false);
  }

  const handlePower = () => {
    setPower(!power);
    if (normal) setNormal(false);
  }

  useEffect(() => {
  }, [normal, power]);

  return (
    <div>
      {isSuper &&
      <div className={styles.gameModalBox}>
        <div className={styles.radioGroup}>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            value="Normal"
            checked={normal}
            onChange={handleNormal}
          />
          <h2 className={styles.gameModeFont}>
          Normal
          </h2>
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            value="Power"
            checked={power}
            onChange={handlePower}
          />
          <h2 className={styles.gameModeFont}>
          Power
          </h2>
        </label>
        </div>
        <button className={styles.gameModalButton} onClick={handleCloseModal} type='submit'>
          <h2 className={styles.gameModalFont}>Start</h2>
        </button>
      </div> }
      {!isSuper &&
      <div className={styles.blinking}>
        <h2 className={styles.matchingFont}>wait for setting</h2>
      </div>
      }
    </div>
  )
}
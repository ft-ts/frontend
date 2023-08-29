"use client";

import styles from './game-wrapper.module.scss'
import Image from 'next/image'
import GameItem from './gameItem';

export default function GameWrapper() {
  return (
    <div className={styles.midWrapper}>
        <GameItem />
    </div>
  )
}
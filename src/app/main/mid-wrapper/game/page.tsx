"use client";

import styles from './game-wrapper.module.scss'
import Image from 'next/image'
import GamePage from './game.page';

export default function GameWrapper() {
  return (
    <div className={styles.midWrapper}>
        <GamePage />
    </div>
  )
}

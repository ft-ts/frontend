"use client";

import styles from './game-wrapper.module.scss'
import GamePage from './game.page';

export default function GameWrapper() {
  const handleClick = () => {
    console.log('click')
  }
  return (
    <div className={styles.midWrapper} onClick={handleClick}>
        <GamePage />
    </div>
  )
}
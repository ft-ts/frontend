"use client";

import ChatWrapper from './chat/page'
import GamePage from './game/game.page';
import styles from './mid-wrapper.module.scss'

function MidWrapper() {
  return (
    <div className={styles.midWrapper}>
      <GamePage />
      <ChatWrapper />
    </div>
  )
}

export default MidWrapper;
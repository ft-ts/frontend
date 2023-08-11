"use client";
import styles from './game-wrapper.module.scss'
import Image from 'next/image'

export default function GameWrapper() {
  return (
    <div className={styles.midWrapper}>
      <GameBackground />
    </div>
  )
}

const GameBackground = (props: {}) => {
    return (
        <div className={styles.gameBackground}>
            <div className={styles.gameDisplayBackground}></div>
            <GameMatch />
            <GameRecordSearch />
        </div>
    )
}

const GameMatch = (props: {}) => {
    const handleClick = () => {
        alert("Game Matching")
    }
    return (
        <button 
        className={styles.gameMatchButton}
        onClick={handleClick}
        >
            <h2 className={styles.gameMatchFont}>Game Matching</h2>
        </button>
    )
}

const GameRecordSearch = (props: {} | any) => {
    return (
        <div>
            <input className={styles.gameRecordSearchBox}></input>
            <button className={styles.gameRecordSearchButton}>
            <Image
                className={styles.gameRecordIcon}
                src="asset/RecordSearch.svg"
                alt="RecordSearch icon"
                width={43}
                height={43}
                ></Image>
            </button>
        </div>
        
    )
}
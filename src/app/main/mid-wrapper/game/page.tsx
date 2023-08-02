import styles from "./game-wrapper.module.scss"

export default function GameWrapper() {
  return (
    <div className={styles.midWrapper}>
      <h1>GameWrapper</h1>
      <GameBackground />
    </div>
  )
}

const GameBackground = (props: {}) => {
    return (
        <div className={styles.gameBackground}>
            <GameMatch />
        </div>
    )
}

const GameMatch = (props: {}) => {
    return (
        <button className={styles.gameMatchButton}>
            <h2 className={styles.gameMatchFont}>Game Matching</h2>
        </button>
    )
}
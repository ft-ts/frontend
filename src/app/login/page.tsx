import Link from "next/link";
import styles from "./login.module.scss";

export default function Login() {

  return (
    <div className={styles.background}>
        <GameBackground />
    </div>
  )
}


const GameBackground = (props: {}) => {
    return (
        <div className={styles.gameBackground}>
            <div className={styles.displayBackground}>
                <h1 className={styles.gameFont}>42 Login</h1>
                <h2 className={styles.pressFont}>Press Start Button</h2>
            </div>
        </div>
    )
}
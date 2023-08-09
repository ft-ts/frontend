import Link from "next/link";
import styles from "./login.module.scss";
import Image from "next/image";

export default function Login() {

  return (
    <div className={styles.background}>
        <GameBackground />
        <GameCrossDeco />
        <GameRoundRectangleDeco />
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

const GameCrossDeco = () => {
    return (
        <Image
        src="/asset/Union.svg"
        alt="game cross button deco"
        width={300}
        height={300}
        className={styles.gameCrossDeco}
        ></Image>
    )
}

const GameRoundRectangleDeco = () => {
    return (
        <div className={styles.container}>
            <Image
                src="/asset/RoundRectangleButton.svg"
                alt="RoundButtonRectangleDecoA"
                width={180}
                height={67}
                className={styles.GameRoundRectangleDecoA}>
            </Image>
            <Image
                src="/asset/RoundRectangleButton.svg"
                alt="RoundButtonRectangleDecoB"
                width={180}
                height={67}
                className={styles.GameRoundRectangleDecoB}>
            </Image>
        </div>
    )
}

"use client";
import Link from "next/link";
import styles from "./login.module.scss";
import Image from "next/image";
import { SecondAuthLogin } from "./secondAuth";
import React, { useState } from "react";

export default function Login() {

  return (
    <div className={styles.background}>
        <GameBackground />
        <GameCrossDeco />
        <GameSelectButton />
        <GameStartButton />
        <GameRoundDeco />
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

// const GameRoundRectangleDeco = () => {
//     return (
//         <button className={styles.container}>
//             <Image
//                 src="/asset/RoundRectangleButton.svg"
//                 alt="RoundButtonRectangleDecoA"
//                 width={250}
//                 height={100}
//                 className={styles.GameRoundRectangleDecoSelect}>
//             </Image>
//             <Image
//                 src="/asset/RoundRectangleButton.svg"
//                 alt="RoundButtonRectangleDecoB"
//                 width={250}
//                 height={100}
//                 className={styles.GameRoundRectangleDecoStart}>
//             </Image>
//             <h2 className={styles.startFont}>Start</h2>
//             <h2 className={styles.selectFont}>Select</h2>
//         </button>
//     )
// }

const GameSelectButton = () => {

    const [showAuth, setShowAuth] = useState(false);

    const handleClick = () => {
        setShowAuth(true);
    }

    return (
        <div>
            <button onClick={handleClick}  className={styles.container}>
                <Image
                    src="/asset/RoundRectangleButton.svg"
                    alt="RoundButtonRectangleDecoA"
                    width={250}
                    height={100}
                    className={styles.GameRoundRectangleDecoSelect}>
                </Image>
                <h2 className={styles.selectFont}>Select</h2>
            </button>
            {showAuth && <SecondAuthLogin />}
        </div>
    )
}

const GameStartButton = () => {
    return (
        <button className={styles.container}>
            <Image
                src="/asset/RoundRectangleButton.svg"
                alt="RoundButtonRectangleDecoB"
                width={250}
                height={100}
                className={styles.GameRoundRectangleDecoStart}>
            </Image>
            <h2 className={styles.startFont}>Start</h2>
        </button>
    )
}

const GameRoundDeco = () => {
    return (
        <button className={styles.roundContainer}>
            <Image
                src="/asset/RoundButtonDeco.svg"
                alt="RoundButtonDecoA"
                width={150}
                height={150}
                className={styles.gameRoundDecoA}
                ></Image>
            <Image
                src="/asset/RoundButtonDeco.svg"
                alt="RoundButtonDecoB"
                width={150}
                height={150}
                className={styles.gameRoundDecoB}
                ></Image>
            <h2 className={styles.gameRoundFontA}>A</h2>
            <h2 className={styles.gameRoundFontB}>B</h2>
        </button>
    )
}


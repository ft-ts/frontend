"use client";

import styles from "./login.module.scss"
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { clearCookies } from "../utils/clearCookies";

export default function Login() {

  useEffect(() => {
    clearCookies();
  }, []);

  return (
    <div className={styles.background}>
      <GameBackground />
      <div className={styles.buttonsWrapper}>
        <GameCrossDeco />
        <div className={styles.midButtons}>
          <GameSelectButton />
          <GameStartButton />
        </div>
        <GameRoundDeco />
      </div>
    </div>
  )
}


const GameBackground = () => {
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
    <img
      src="/asset/Union.svg"
      alt="game cross button deco"
      width={300}
      height={300}
      className={styles.gameCrossDeco}
    />
  )
}

const GameSelectButton = () => {

  return (
    <div>
      <button className={styles.container}>
        <img
          src="/asset/RoundRectangleButton.svg"
          alt="RoundButtonRectangleDecoA"
          width={250}
          height={100}
          className={styles.GameRoundRectangleDecoSelect} />
        <h2 className={styles.selectFont}>Select</h2>
      </button>
    </div>
  )
}

const GameStartButton = () => {

  const router = useRouter();
  const handleLoginClick = async () => {
    router.push(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`);
  };

  return (
    <button onClick={handleLoginClick} className={styles.container}>
      <img
        src="/asset/RoundRectangleButton.svg"
        alt="RoundButtonRectangleDecoB"
        width={250}
        height={100}
        className={styles.GameRoundRectangleDecoStart} />
      <h2 className={styles.startFont}>Start</h2>
    </button>
  )
}


const GameRoundDeco = () => {

  return (
    <button className={styles.roundContainer}>
      <div className={styles.roundBtnWrapper}>
        <img
          src="/asset/RoundButtonDeco.svg"
          alt="RoundButtonDecoA"
          width={150}
          height={150}
          className={styles.gameRoundDecoA}
        />
        <h2 className={styles.gameRoundFontA}>A</h2>
      </div>
      <div className={styles.roundBtnWrapper}>
        <img
          src="/asset/RoundButtonDeco.svg"
          alt="RoundButtonDecoB"
          width={150}
          height={150}
          className={styles.gameRoundDecoB}
        />
        <h2 className={styles.gameRoundFontB}>B</h2>
      </div>
    </button>
  )
}


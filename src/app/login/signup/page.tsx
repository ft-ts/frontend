"use client";

import loginStyles from "../login.module.scss"
import styles from "./signup.module.scss"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {

  return (
    <>
      <div className={loginStyles.background}>
        <GameBackground />
        <div className={loginStyles.buttonsWrapper}>
          <GameCrossDeco />
          <div className={loginStyles.midButtons}>
            <GameSelectButton />
            <GameStartButton />
          </div>
          <GameRoundDeco />
        </div>
      </div>
    </>
  )
}


const GameBackground = () => {
  return (
    <div className={loginStyles.gameBackground}>
      <div className={loginStyles.displayBackground}>
        <h1 className={styles.title}>Sign Up</h1>
        <div className={styles.avatar}></div>
        <input type="text" className={styles.nameInput} />
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
      className={loginStyles.gameCrossDeco}
    ></Image>
  )
}

const GameSelectButton = () => {

  return (
    <div>
      <button className={loginStyles.container}>
        <Image
          src="/asset/RoundRectangleButton.svg"
          alt="RoundButtonRectangleDecoA"
          width={250}
          height={100}
          className={loginStyles.GameRoundRectangleDecoSelect}>
        </Image>
        <h2 className={loginStyles.selectFont}>Select</h2>
      </button>
    </div>
  )
}

const GameStartButton = () => {

  return (
    <button className={loginStyles.container}>
      <Image
        src="/asset/RoundRectangleButton.svg"
        alt="RoundButtonRectangleDecoB"
        width={250}
        height={100}
        className={loginStyles.GameRoundRectangleDecoStart}>
      </Image>
      <h2 className={loginStyles.startFont}>Start</h2>
    </button>
  )
}


const GameRoundDeco = () => {

  return (
    <button className={loginStyles.roundContainer}>
      <div className={loginStyles.roundBtnWrapper}>
        <Image
          src="/asset/RoundButtonDeco.svg"
          alt="RoundButtonDecoA"
          width={150}
          height={150}
          className={loginStyles.gameRoundDecoA}
        ></Image>
        <h2 className={loginStyles.gameRoundFontA}>A</h2>
      </div>
      <div className={loginStyles.roundBtnWrapper}>
        <Image
          src="/asset/RoundButtonDeco.svg"
          alt="RoundButtonDecoB"
          width={150}
          height={150}
          className={loginStyles.gameRoundDecoB}
        ></Image>
        <h2 className={loginStyles.gameRoundFontB}>B</h2>
      </div>
    </button>
  )
}


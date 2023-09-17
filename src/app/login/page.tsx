"use client";

import styles from "./login.module.scss"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "../axios/client";
import { clearCookies } from "../utils/clearCookies";


export default function Login() {

  useEffect(() => {
    clearCookies();
  }, []);

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

const GameSelectButton = () => {

  return (
    <div>
      <button className={styles.container}>
        <Image
          src="/asset/RoundRectangleButton.svg"
          alt="RoundButtonRectangleDecoA"
          width={250}
          height={100}
          className={styles.GameRoundRectangleDecoSelect}>
        </Image>
        <h2 className={styles.selectFont}>Select</h2>
      </button>
    </div>
  )
}

const GameStartButton = () => {

  const router = useRouter();
  const handleLoginClick = async () => {
    router.push('http://localhost:10000/api/login');
  };

  return (
    <button onClick={handleLoginClick} className={styles.container}>
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
  const router = useRouter();
  const loginasDemoUser = (name: string, uid: number): void => {
    apiClient.post('login/addDemoUser', {
      "email": `${name}@gmail.com`,
      "avatar": "/asset/profile_dummy.png",
      "name": name,
      "uid": uid,
    }).then((res) => {
      document.cookie = `accessToken=${res.data.accessToken}`;
      document.cookie = `refreshToken=${res.data.refreshToken}`;
      router.push('/main');
    });
  };

  return (
    <button className={styles.roundContainer}>
      <Image
        onClick={() => loginasDemoUser('BBBB', 2222)}
        src="/asset/RoundButtonDeco.svg"
        alt="RoundButtonDecoA"
        width={150}
        height={150}
        className={styles.gameRoundDecoA}
      ></Image>
      <Image
        onClick={() => loginasDemoUser('AAAA', 1111)}
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


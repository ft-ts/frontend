"use client";

import styles from "./secondAuth.module.scss"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "../../axios/client";


export default function Input2fa() {
  const [authCode, setAuthCode] = useState<string>("");
  const [qrCode, setQrCode] = useState<string>("");

  useEffect(() => {
    apiClient.get("login/2fa").then((res) => {
      setQrCode(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }, []);

  return (
    <div className={styles.background}>
      <GameBackground authCode={authCode} setAuthCode={setAuthCode} qrCode={qrCode} />
      <GameCrossDeco />
      <GameSelectButton />
      <GameStartButton />
      <GameRoundDeco />
    </div>
  )
}

const GameBackground = ({ authCode, setAuthCode, qrCode }: { authCode: string, setAuthCode: any, qrCode: string }) => {
  const router = useRouter();

  const handleKeyDown = (e: any) => {
    if (authCode.length > 0 && e.key === "Backspace") {
      setAuthCode(authCode.slice(0, -1));
    } else if (authCode.length === 6 && e.key === "Enter") {
      //////
      apiClient.post("login/2fa", { code: authCode }).then((res) => {
        if (res.data === "success") {
          router.push("/home");
        }
      }).catch((err) => {
        console.log(err);
      })

      //////
    } else if (authCode.length < 6 && e.key.match(/^\d{1}$/)) {
      setAuthCode(authCode + e.key);
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }
  }, [authCode]);

  return (
    <div className={styles.gameBackground}>
      <div className={styles.qrText}>
        <p>Scan with</p>
        <a target="_blank"
          href="https://support.google.com/accounts/answer/1066447?hl=en&co=GENIE.Platform%3DiOS&oco=0">
        Google Auth
        </a>
      </div>
      <Image
        src="/asset/pigtail.png"
        alt="pigtail"
        width={100}
        height={100}
        className={styles.pigtail}
      ></Image>
      {qrCode && <Image
        src={qrCode}
        alt="qr code"
        width={300}
        height={300}
        className={styles.qrCode}
      ></Image>
      }
      <div className={styles.displayBackground}>
        <div className={styles.codeBackground}>{authCode[0] ? authCode[0] : "?"}</div>
        <div className={styles.codeBackground}>{authCode[1] ? authCode[1] : "?"}</div>
        <div className={styles.codeBackground}>{authCode[2] ? authCode[2] : "?"}</div>
        <div className={styles.dash}>-</div>
        <div className={styles.codeBackground}>{authCode[3] ? authCode[3] : "?"}</div>
        <div className={styles.codeBackground}>{authCode[4] ? authCode[4] : "?"}</div>
        <div className={styles.codeBackground}>{authCode[5] ? authCode[5] : "?"}</div>
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
      <div className={styles.container}>
        <Image
          src="/asset/RoundRectangleButton.svg"
          alt="RoundButtonRectangleDecoA"
          width={250}
          height={100}
          className={styles.GameRoundRectangleDecoSelect}>
        </Image>
        <h2 className={styles.selectFont}>Select</h2>
      </div>
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


"use client";

import loginStyles from "../login.module.scss"
import styles from "./secondAuth.module.scss"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "../../axios/client";
import { clearCookies } from "@/app/utils/clearCookies";

export default function Input2fa() {
  const router = useRouter();
  const [authCode, setAuthCode] = useState<string>("");
  const [qrCode, setQrCode] = useState<string>("");

  useEffect(() => {
    try {
      apiClient.get("login/2fa").then((res) => {
        setQrCode(res.data);
      })
      const main = document.cookie?.split('; ')?.find(item => item.startsWith('main'))?.split('=')[1];
      if (main) {
        clearCookies();
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
      router.push("/login");
    }
  }, []);

  return (
    <div className={loginStyles.background}>
      <GameBackground authCode={authCode} setAuthCode={setAuthCode} qrCode={qrCode} />
      <div className={loginStyles.buttonsWrapper}>
        <GameCrossDeco />
        <div className={loginStyles.midButtons}>
          <GameSelectButton />
          <GameStartButton />
        </div>
        <GameRoundDeco />
      </div>
    </div>
  )
}

const GameBackground = ({ authCode, setAuthCode, qrCode }: { authCode: string, setAuthCode: any, qrCode: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.cursor = loading ? "wait" : "default";
  }, [loading]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }
  }, [authCode]);

  const sendCode = () => {
    setLoading(true);
    setTimeout(() => {
      apiClient.post("login/2fa", { code: authCode }).then((res) => {
        if (res.status == 200)
          res.data.success ? router.push("/main") : alert(res.data.message);
      });
      setAuthCode('');
      setLoading(false);
    }, 1000);
  }

  const handleKeyDown = (e: any) => {
    if (!loading && authCode.length > 0 && e.key === "Backspace")
      setAuthCode(authCode.slice(0, -1));
    else if (authCode.length < 6 && e.key.match(/^\d{1}$/)) {
      setAuthCode(authCode += e.key);
      if (authCode.length === 6) sendCode();
    }
  }

  return (
    <div className={loginStyles.gameBackground}>
      <div className={styles.displayBackground}>
        <div></div>
        <div className={styles.codeWrapper}>
          <div className={styles.codeBackground}>{authCode[0] ? authCode[0] : '?'}</div>
          <div className={styles.codeBackground}>{authCode[1] ? authCode[1] : '?'}</div>
          <div className={styles.codeBackground}>{authCode[2] ? authCode[2] : '?'}</div>
          <div className={styles.dash}>-</div>
          <div className={styles.codeBackground}>{authCode[3] ? authCode[3] : '?'}</div>
          <div className={styles.codeBackground}>{authCode[4] ? authCode[4] : '?'}</div>
          <div className={styles.codeBackground}>{authCode[5] ? authCode[5] : '?'}</div>
        </div>
        <QRImg qrCode={qrCode} />
      </div>
    </div>
  )
}

const QRImg = ({ qrCode }: { qrCode: string }) => {
  return (
    <div className={styles.qrWrapper}>
      <div className={styles.qrText}>
        <p>Scan with</p>
        <a target="_blank"
          href="https://support.google.com/accounts/answer/1066447?hl=en&co=GENIE.Platform%3DiOS&oco=0">
          Google Auth
        </a>
      </div>
      <img
        src="/asset/pigtail.png"
        alt="pigtail"
        width={100}
        height={100}
        className={styles.pigtail}
      />
      {qrCode && <img
        src={qrCode}
        alt="qr code"
        width={300}
        height={300}
        className={styles.qrCode}
      />
      }
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
      className={loginStyles.gameCrossDeco}
    />
  )
}

const GameSelectButton = () => {

  return (
    <div>
      <div className={loginStyles.container}>
        <img
          src="/asset/RoundRectangleButton.svg"
          alt="RoundButtonRectangleDecoA"
          width={250}
          height={100}
          className={loginStyles.GameRoundRectangleDecoSelect} />
        <h2 className={loginStyles.selectFont}>Select</h2>
      </div>
    </div>
  )
}

const GameStartButton = () => {

  return (
    <div className={loginStyles.container}>
      <img
        src="/asset/RoundRectangleButton.svg"
        alt="RoundButtonRectangleDecoB"
        width={250}
        height={100}
        className={loginStyles.GameRoundRectangleDecoStart} />
      <h2 className={loginStyles.startFont}>Start</h2>
    </div>
  )
}


const GameRoundDeco = () => {

  return (
    <div className={loginStyles.roundContainer}>
      <div className={loginStyles.roundBtnWrapper}>
        <img
          src="/asset/RoundButtonDeco.svg"
          alt="RoundButtonDecoA"
          width={150}
          height={150}
          className={loginStyles.gameRoundDecoA}
        />
        <h2 className={loginStyles.gameRoundFontA}>A</h2>
      </div>
      <div className={loginStyles.roundBtnWrapper}>
        <img
          src="/asset/RoundButtonDeco.svg"
          alt="RoundButtonDecoB"
          width={150}
          height={150}
          className={loginStyles.gameRoundDecoB}
        />
        <h2 className={loginStyles.gameRoundFontB}>B</h2>
      </div>
    </div>
  )
}


"use client";

import loginStyles from "../login.module.scss"
import styles from "./signup.module.scss"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/app/axios/client";

export default function SignUp() {

  const [name, setName] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");

  return (
    <>
      <div className={loginStyles.background}>
        <GameBackground states={[name, setName, avatar, setAvatar]} />
        <div className={loginStyles.buttonsWrapper}>
          <GameCrossDeco />
          <div className={loginStyles.midButtons}>
            <GameSelectButton />
            <GameStartButton states={[name, avatar]} />
          </div>
          <GameRoundDeco />
        </div>
      </div>
    </>
  )
}

const GameBackground = ({ states }: { states: [string, React.Dispatch<React.SetStateAction<string>>, string, React.Dispatch<React.SetStateAction<string>>] }) => {
  const avatarRef = React.useRef<HTMLLabelElement>(null);
  const [name, setName, avatar, setAvatar] = states;

  useEffect(() => {
    apiClient.get("/users").then((res) => {
      setName(res.data.name);
      setAvatar(res.data.avatar);
    });
  }, []);

  useEffect(() => {
    if (avatar && avatarRef.current)
      avatar ? avatarRef.current.style.backgroundImage = `url(${avatar})` : null;
  }, [name, avatar]);

  const handleAvatar = () => {
    const file = document.getElementById("avatar-upload") as HTMLInputElement;
    if (file.files && file.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target?.result) {
          setAvatar(e.target?.result.toString());
        }
      }
      reader.readAsDataURL(file.files[0]);
    }
  }

  return (
    <div className={loginStyles.gameBackground}>
      <div className={loginStyles.displayBackground}>
        <h1 className={styles.title}>Sign Up</h1>
        <input id="avatar-upload" type="file" accept="image/png, image/jpeg" onChange={handleAvatar} className={styles.avatar} />
        <label htmlFor="avatar-upload" ref={avatarRef} className={styles.avatarLabel}></label>
        <input type="text" className={styles.nameInput} value={name} onChange={(e) => setName(e.target.value)} />
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

const GameStartButton = ({ states }: { states: [string, string] }) => {
  const router = useRouter();
  const [name, avatar] = states;

  const handleStart = () => {
    if (!name || !avatar) return;

    if (name.length <= 2 || name.length >= 20) {
      alert("이름은 3글자 이상 19글자 이하로 입력해주세요.");
      return ;
    }

    if (name.match(/[^a-zA-Z0-9]/)) {
      alert("이름은 영어와 숫자만 입력해주세요.");
      return ;
    }
    
    apiClient.patch("/users", { name, avatar }).then((res) => {
      router.push("/main");
    });
  }

  return (
    <button 
      onClick={handleStart}
      className={loginStyles.container}>
      <Image
        loading={"lazy"}
        fill
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


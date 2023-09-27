"use client";

import loginStyles from "../login.module.scss"
import styles from "./signup.module.scss"
import React, { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/app/axios/client";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");

  useEffect(() => {
    try {
    } catch (error) {
      router.push("/login");
    }
  }, []);

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
  const router = useRouter();
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

  const handleAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    const eventFiles = event.target.files;

    if (!eventFiles || eventFiles.length === 0)
      return;

    uploadImage(eventFiles[0]);
  }

  const uploadImage = (file: File) => {

    if (file.size > 200000)
      return alert("200KB 이하의 이미지만 업로드 가능합니다.");

    const reader = new FileReader();

    reader.onload = (e) => {
      if (reader.readyState !== 2)
        return;
      if (typeof e.target?.result === "string") {

        const accessToken = document.cookie?.split('; ')?.find(item => item.startsWith('accessToken'))?.split('=')[1];
        if (!accessToken) {
          router.push("/login");
        }

        apiClient.patch(`/users`, { avatar: e.target?.result }, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
          },
        }).then((res) => {
          if (res.status === 200 && res.data?.avatar) {
            setAvatar(res.data.avatar);
            alert("이미지 업로드에 성공했습니다.. ");
          }
          else
            alert("이미지 업로드에 실패했습니다.. ");
        });
      }
      else
        new Error("FileReader error");
    }

    reader.onerror = (e) => {
      new Error("FileReader error");
    };

    reader.readAsDataURL(file);
  }

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");

    if (e.target.value.length > 10)
      return;
    setName(e.target.value);
  }

  return (
    <div className={loginStyles.gameBackground}>
      <div className={loginStyles.displayBackground}>
        <h1 className={styles.title}>Sign Up</h1>
        <input id="avatar-upload" type="file" accept="image/png, image/jpeg" onChange={handleAvatar} className={styles.avatar} />
        <label htmlFor="avatar-upload" ref={avatarRef} className={styles.avatarLabel}></label>
        <input type="text" className={styles.nameInput} value={name} onChange={handleName} />
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
      className={loginStyles.gameCrossDeco}
    />
  )
}

const GameSelectButton = () => {

  return (
    <div>
      <button className={loginStyles.container}>
        <img
          src="/asset/RoundRectangleButton.svg"
          alt="RoundButtonRectangleDecoA"
          width={250}
          height={100}
          className={loginStyles.GameRoundRectangleDecoSelect} />
        <h2 className={loginStyles.selectFont}>Select</h2>
      </button>
    </div>
  )
}

const GameStartButton = ({ states }: { states: [string, string] }) => {
  const router = useRouter();
  const [name, avatar] = states;

  const handleStart = () => {
    if (!name) return;

    if (name.length < 3 || name.length > 10) {
      alert("이름은 3글자 이상 10 글자 이하로 입력해주세요.");
      return;
    }

    if (name.match(/[^a-zA-Z0-9]/)) {
      alert("이름은 영어와 숫자만 입력해주세요.");
      return;
    }

    apiClient.patch("/users", { name }).then((res) => {
      router.push("/main");
    });
  }

  return (
    <button
      onClick={handleStart}
      className={loginStyles.container}>
      <img
        loading={"lazy"}
        src="/asset/RoundRectangleButton.svg"
        alt="RoundButtonRectangleDecoB"
        width={250}
        height={100}
        className={loginStyles.GameRoundRectangleDecoStart} />
      <h2 className={loginStyles.startFont}>Start</h2>
    </button>
  )
}


const GameRoundDeco = () => {

  return (
    <button className={loginStyles.roundContainer}>
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
    </button>
  )
}


"use client";

import Styles from "./TwoFactorAuth.module.scss"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TwoFactorAuth() {

    const [input, setInput] = useState("");

    useEffect(() => {

        document.addEventListener('keydown', (event) => {
            const keyName = event.key;
            if (keyName.match(/[a-zA-Z]/i)) {
                setInput(input + keyName);
            }
            if (keyName === "Backspace") {
                setInput(input.slice(0, -1));
            }
        });
    }, [input]);

    return (
        <div className={Styles.background}>
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
        <div className={Styles.gameBackground}>
            <div className={Styles.displayBackground}>
                <div className={Styles.inputCartridge}>1</div>
                <div className={Styles.inputCartridge}>1</div>
                <div className={Styles.inputCartridge}>1</div>
                <div className={Styles.dash}> - </div>
                <div className={Styles.inputCartridge}>1</div>
                <div className={Styles.inputCartridge}>1</div>
                <div className={Styles.inputCartridge}>1</div>
                {/* <input className={Styles.inputCartridge} /> */}
                {/* <h1 className={Styles.gameFont}>42 Login</h1> */}
                {/* <h2 className={Styles.pressFont}>Press Start Button</h2> */}
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
            className={Styles.gameCrossDeco}
        ></Image>
    )
}

const GameSelectButton = () => {

    return (
        <div>
            <button className={Styles.container}>
                <Image
                    src="/asset/RoundRectangleButton.svg"
                    alt="RoundButtonRectangleDecoA"
                    width={250}
                    height={100}
                    className={Styles.GameRoundRectangleDecoSelect}>
                </Image>
                <h2 className={Styles.selectFont}>Select</h2>
            </button>
        </div>
    )
}

const GameStartButton = () => {
    return (
        <button className={Styles.container}>
            <Image
                src="/asset/RoundRectangleButton.svg"
                alt="RoundButtonRectangleDecoB"
                width={250}
                height={100}
                className={Styles.GameRoundRectangleDecoStart}>
            </Image>
            <h2 className={Styles.startFont}>Start</h2>
        </button>
    )
}


const GameRoundDeco = () => {
    return (
        <button className={Styles.roundContainer}>
            <Image
                src="/asset/RoundButtonDeco.svg"
                alt="RoundButtonDecoA"
                width={150}
                height={150}
                className={Styles.gameRoundDecoA}
            ></Image>
            <Image
                src="/asset/RoundButtonDeco.svg"
                alt="RoundButtonDecoB"
                width={150}
                height={150}
                className={Styles.gameRoundDecoB}
            ></Image>
            <h2 className={Styles.gameRoundFontA}>A</h2>
            <h2 className={Styles.gameRoundFontB}>B</h2>
        </button>
    )
}


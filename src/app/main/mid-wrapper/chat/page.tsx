import styles from "./chat-wrapper.module.scss"
import React from "react";
import Image from "next/image";

export default function ChatWrapper() {
  return (
    <div className={styles.chatWrapper}>
      <h1>ChatWrapper</h1>
      <ChatBackground />
    </div>
  )
}

interface messageDecoProps{
    left: string;
}

const ChatBackground = (props: {}) => {
    return (
        <div className={styles.chatBackground}>
            <div className={styles.chatBackgroundBorder}></div>
            <ChatSettingButton />
            <LobbyNewMessage />
        </div>
    )
}

const ChatSettingButton = (props: {}) => {
    return (
        <button className={styles.settingButton}>
            <Image 
                src="/asset/setting.svg"
                alt="settingButton"
                width={44.45}
                height={39}
                />
        </button>
    )
}



const LobbyNewMessage = (props: {}) => {
    return (
        <div>
            <h2 className={styles.LobbyMessageFont}>New message</h2>
            <span className={styles.lobbyMessageBar} style={{left: '50px'}}></span>
            <span className={styles.lobbyMessageBar} style={{left: '563px'}}></span>
        </div>
        
    )
}
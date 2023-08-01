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


const ChatBackground = (props: {}) => {
    return (
        <div className={styles.chatBackground}>
            <div className={styles.chatBackgroundBorder}></div>
            <ChatSettingButton />
            <UserlistButton />
            <LobbyNewMessage />
            <InputMessage />
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

const UserlistButton = (props: {}) => {
    return (
        <button className={styles.userlistButton}>
            <Image
                src="/asset/user_list_button.svg"
                alt="userlist button"
                width = {44.45}
                height={38}></Image>
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

const InputMessage = (props: {}) => {
    return (
        <span>
            <input className={styles.inputMessageBox}></input>
            <div className={styles.messageSendBox}></div>
            <h1 className={styles.messageSendFont}>send</h1>
        </span>
    )
}
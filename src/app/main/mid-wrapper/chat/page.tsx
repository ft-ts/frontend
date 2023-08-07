import styles from "./chat-wrapper.module.scss"
import React from "react";
import Image from "next/image";

export default function ChatWrapper() {
  return (
    <div className={styles.chatWrapper}>
      <ChatBackground />
    </div>
  )
}


const ChatBackground = (props: {}) => {
    return (
        <div className={styles.chatBackground}>
            <ChatSettingButton />
            <UserlistButton />
            <div className={styles.chatBackgroundBorder}>
                <LobbyNewMessage />
                <InputMessage />
            </div>
        </div>
    )
}

const ChatSettingButton = (props: {}) => {
    return (
        <button className={styles.settingButton}>
            <Image 
                src="/asset/setting.svg"
                alt="settingButton"
                width={64.45}
                height={58}
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
                width={64.45}
                height={58}
                className="w-full h-auto"
            ></Image>
        </button>
    )
}



const LobbyNewMessage = (props: {}) => {
    return (
        <div>
            <h2 className={styles.LobbyMessageFont}>New message</h2>
            <span className={styles.lobbyMessageBar} style={{left: '30px'}}></span>
            <span className={styles.lobbyMessageBar} style={{left: '758px'}}></span>
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
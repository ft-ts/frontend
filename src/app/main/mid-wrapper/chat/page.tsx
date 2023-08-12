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
    <div>
        <span className={styles.chatMenuBox}>
            <UserlistButton />
            <ChatSettingButton />
        </span>
        <InputMessage />
    </div>
  );
};

const ChatSettingButton = (props: {}) => {
    return (
        <button className={styles.settingButton}>
            <Image 
                src="/asset/setting.svg"
                alt="settingButton"
                width={55}
                height={55}
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
                width={55}
                height={55}
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
        <span className={styles.spanSendMessage}>
            <input className={styles.inputMessageBox}></input>
            <button className={styles.messageSendBox}>SEND</button>
        </span>
    )
}
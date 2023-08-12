import styles from "./chat-wrapper.module.scss";
import React from "react";
import ChatMenu from "./chatMenu";

export default function ChatWrapper() {
  return (
    <div className={styles.chatWrapper}>
      <ChatMenu />
      <HandleMessage />
    </div>
  );
}

const HandleMessage = (props: {}) => {
  return (
    <span className={styles.spanSendMessage}>
      <input className={styles.inputMessageBox}></input>
      <button className={styles.messageSendBox}>SEND</button>
    </span>
  );
};

// const LobbyNewMessage = (props: {}) => {
//     return (
//       <div>
//         <h2 className={styles.LobbyMessageFont}>New message</h2>
//         <span className={styles.lobbyMessageBar} style={{ left: "30px" }}></span>
//         <span className={styles.lobbyMessageBar} style={{ left: "758px" }}></span>
//       </div>
//     );
//   };
  

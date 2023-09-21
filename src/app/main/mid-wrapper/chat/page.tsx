"use client";

import styles from "./chat-wrapper.module.scss";
import React from "react";
import ChatMenu from "./chatMenu";
import ChatRoom from "./chatRoom";

function ChatWrapper(){

  return (
    <div className={styles.chatWrapper}>
      <ChatMenu />
      <ChatRoom /> 
    </div>
  );
}

export default ChatWrapper;

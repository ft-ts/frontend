"use client";

import styles from "./chat-wrapper.module.scss";
import React from "react";
import ChatMenu from "./chatMenu";
import ChatRoom from "./chatRoom";

interface ChatWrapperProps {
  channelId: number | null;
}

function ChatWrapper(props: ChatWrapperProps){

  return (
    <div className={styles.chatWrapper}>
      <ChatMenu channelId={props.channelId} />
      <ChatRoom channelId={props.channelId}/>
    </div>
  );
}

export default ChatWrapper;

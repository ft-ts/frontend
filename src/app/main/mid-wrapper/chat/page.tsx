"use client";

import styles from "./chat-wrapper.module.scss";
import React from "react";
import ChatMenu from "./chatMenu";
import ChatRoom from "./chatRoom";
import { socket } from "../../../socketConfig";

interface ChatWrapperProps {
  channelId: number | null;
}

function ChatWrapper(props: ChatWrapperProps){

  return (
    <div className={styles.chatWrapper}>
      <ChatMenu socket={socket} channelId={props.channelId} />
      <ChatRoom socket={socket} channelId={props.channelId}/>
    </div>
  );
}

export default ChatWrapper;

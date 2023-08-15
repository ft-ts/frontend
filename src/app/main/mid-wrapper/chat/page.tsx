"use client";

import styles from "./chat-wrapper.module.scss";
import React from "react";
import ChatMenu from "./chatMenu";
import ChatRoom from "./chatRoom";
import { socket } from "../../../socketConfig";

export default function ChatWrapper({ channelId }: {channelId: number | null}){

  return (
    <div className={styles.chatWrapper}>
      <ChatMenu socket={socket} channelId={channelId} />
      <ChatRoom socket={socket} channelId={channelId}/>
    </div>
  );
}

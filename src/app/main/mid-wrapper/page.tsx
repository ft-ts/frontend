"use client";

import ChatWrapper from './chat/page'
import GameWrapper from './game/page'
import './mid-wrapper.css'

interface MidWrapperProps {
  channelId: number | null;
}

function MidWrapper(props: MidWrapperProps) {
  return (
    <div id="mid-wrapper">
      <GameWrapper />
      <ChatWrapper channelId={props.channelId}/>
    </div>
  )
}

export default MidWrapper;
"use client";

import ChatWrapper from './chat/page'
import GameWrapper from './game/page'
import './mid-wrapper.css'

function MidWrapper() {
  return (
    <div id="mid-wrapper">
      <GameWrapper />
      <ChatWrapper />
    </div>
  )
}

export default MidWrapper;
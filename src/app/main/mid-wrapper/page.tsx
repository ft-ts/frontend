import ChatWrapper from './chat/page'
import GameWrapper from './game/page'
import './mid-wrapper.css'

export default function MidWrapper() {
  return (
    <div id="mid-wrapper">
      <GameWrapper />
      <ChatWrapper />
    </div>
  )
}
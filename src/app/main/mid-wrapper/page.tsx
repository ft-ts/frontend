import ChatWrapper from './chat/page'
import GameWrapper from './game/page'
import './mid-wrapper.css'

export default function MidWrapper({ channelId }: {channelId: number | null}): JSX.Element {
  return (
    <div id="mid-wrapper">
      <GameWrapper />
      <ChatWrapper channelId={channelId}/>
    </div>
  )
}
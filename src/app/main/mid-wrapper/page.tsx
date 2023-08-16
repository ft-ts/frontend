import ChatWrapper from './chat/page'
import GameWrapper from './game/page'
import './mid-wrapper.css'

interface MidWrapperProps {
  channelId: number | null;
}

function MidWrapper({ channelId }: MidWrapperProps | any) {
  return (
    <div id="mid-wrapper">
      <GameWrapper />
      <ChatWrapper channelId={channelId}/>
    </div>
  )
}

export default MidWrapper;
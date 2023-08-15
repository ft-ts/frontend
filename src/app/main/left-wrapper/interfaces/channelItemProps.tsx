import { ChannelMode } from '../enum/channel.enum';

interface ChannelItemProps {
	title: string;
	memberCnt: number;
	mode: ChannelMode;
	id: number;
	onClick: (channelId: number) => void;
  }
  
  export default ChannelItemProps;
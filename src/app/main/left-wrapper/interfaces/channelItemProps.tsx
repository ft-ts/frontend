import { ChannelMode } from '../enum/temp.enum';

interface ChannelItemProps {
	title: string;
	memberCnt: number;
	mode: ChannelMode;
	id: number;
	onClick: (channelId: number) => void;
  }
  
  export default ChannelItemProps;
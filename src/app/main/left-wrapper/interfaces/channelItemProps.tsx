import { ChannelMode } from '../enum/temp.enum';

interface ChannelItemProps {
	title: string;
	members: number;
	mode: ChannelMode;
	channelId: number;
	onClick: (channelId: number) => void;
  }
  
  export default ChannelItemProps;
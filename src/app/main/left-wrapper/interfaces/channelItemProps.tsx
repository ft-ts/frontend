import { ChannelMode } from '../enum/channel.enum';

interface ChannelItemProps {
	id: number;
	title: string;
	mode: ChannelMode;
	onClick: (id: number) => void;
  }
  
  export default ChannelItemProps;
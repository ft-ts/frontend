import { Socket } from 'socket.io-client';
import ChannelProps from './channelProps';

interface ChannelSettingFormProps {
	onClose: () => void;
	socket: Socket;
	channel: ChannelProps;
  }

export default ChannelSettingFormProps;
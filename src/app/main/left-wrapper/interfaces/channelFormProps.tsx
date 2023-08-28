import { Socket } from 'socket.io-client';

interface ChannelFormProps {
	onClose: () => void;
	socket: Socket;
  }

export default ChannelFormProps;
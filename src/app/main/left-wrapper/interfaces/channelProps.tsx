import { ChannelMode } from '../enum/channel.enum';

interface ChannelProps {
	id: number;
	memberCnt: number;
	title: string;
	mode: ChannelMode;
	password: string | null;
	createdAt: Date;
	banned_uid: number[] | null;
	muted_uid: number[] | null;
  }

export default ChannelProps;
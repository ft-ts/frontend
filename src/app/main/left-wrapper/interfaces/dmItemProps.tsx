import { UserStatus } from '../enum/channel.enum';

interface DmItemProps {
	friend: string;
	profile: string;
	state: UserStatus;
	targetUid: number;
	onClick: (targetUid: number) => void;
  }

  export default DmItemProps;
import { UserStatus } from "../../enum/UserStatus.enum";

interface DmItemProps {
	targetUid: number;
	name: string;
	avatar: string;
	status: UserStatus;
	onClick: (targetUid: number) => void;
  }

  export default DmItemProps;
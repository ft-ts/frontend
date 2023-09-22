import { UserStatus } from "../../enum/UserStatus.enum";

export interface DmItemProps {
  targetUid: number;
  name: string;
  avatar: string;
  status: UserStatus;
  onClick: (targetUid: number) => void;
}

export interface DmListProps {
  user_uid: number;
  user_name: string;
  user_avatar: string;
  unread_count: number;
}
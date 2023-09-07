import styles from './userList.module.scss';
import { UserStatus } from '../../enum/UserStatus.enum';

export function getStatusColor(status: UserStatus){
  switch (status) {
    case UserStatus.ONLINE:
      return styles.online;
    case UserStatus.OFFLINE:
      return styles.offline;
    case UserStatus.IN_GAME:
      return styles.inGame;
    default:
      return styles.offline;
  }
}
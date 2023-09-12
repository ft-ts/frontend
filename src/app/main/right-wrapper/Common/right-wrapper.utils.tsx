import styles from './right-wrapper.utils.module.scss';
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
import styles from './right-wrapper.utils.module.scss';
import { UserStatus } from '../../enum/UserStatus.enum';

export function renderUserStatus(
  {userStatus}:
  {userStatus: UserStatus}
){
  return (
    <div className={styles.userStatusBox}>
      <div className={`${styles.userStatus} ${renderUserStatusUtil(userStatus)}`}></div>
    </div>
  )
}

function renderUserStatusUtil( status: UserStatus){
  switch (status) {
    case UserStatus.ONLINE:
      return styles.statusOnLine;
    case UserStatus.OFFLINE:
      return styles.statusOffLine;
    case UserStatus.IN_GAME:
      return styles.statusInGame;
    default:
      return styles.statusOnLine;
  }
}
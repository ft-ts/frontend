import { UserListItem } from './Components/UserListItem'
import Styles from './user-list.module.scss'

export default function UserList() {
  return (
    <div className={Styles.userList}>
      <div className={Styles.userListHeader}>
        <div className={Styles.userListHeaderTitle}>Friends</div>
        <div className={Styles.userListHeaderTitle}>Channel</div>
        <div className={Styles.userListHeaderTitle}>All</div>
      </div>
      <div className={Styles.search}>
        <input type="text" placeholder="Search" />
      </div>
      <div className={Styles.userListBody}>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((item, index) => {
            return <UserListItem key={index} />
          })
        }
      </div>
      <div className={Styles.bottomMyInfo}>
        <div className={Styles.bottomMyInfoAvatar}></div>
        <div className={Styles.bottomMyInfoName}>DOHYULEE</div>
        <div className={Styles.bottomMyInfoStatus}>ONLINE</div>
        <button className={Styles.btnLogout}></button>
      </div>
    </div>
  )
}
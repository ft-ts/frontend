'use client';
import Styles from './userListItem.module.scss';

export function UserListItem() {
    return (
        <div className={Styles.userListItem}>
            <div className={Styles.userListItemAvatar}></div>
            <div className={Styles.userListItemName}>DOHYULEE</div>
            <div className={Styles.userListItemStatus}>ONLINE</div>
        </div>
    )
}
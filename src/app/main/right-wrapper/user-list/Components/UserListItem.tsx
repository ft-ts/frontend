'use client';
import { useEffect, useState } from 'react';
import Styles from './userListItem.module.scss';
import Image from 'next/image';

export function UserListItem({item, state}: {item: any, state: any}) {
    const [menuOn, setMenuOn, selectedUser, setSelectedUser] = state;

    const toggleMenu = () => {
        setMenuOn(!menuOn);
        setSelectedUser({name: item.name, uid: item.uid});
    }
    return (
        <div onClick={toggleMenu} className={Styles.userListItem}>
            <Image src={item.avatar} width={80} height={80} alt={item.name} className={Styles.userListItemAvatar}></Image>
            <div className={Styles.userListItemName}>{item.name}</div>
            <div className={Styles.userListItemStatus}>{item.status}</div>
        </div>
    )
}
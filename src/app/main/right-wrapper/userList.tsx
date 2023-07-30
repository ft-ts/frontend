import React, { useState, useEffect } from "react";
import styles from "./userList.module.css"
import { UserListProps } from "../userType";

export default function DisplayUserList(props: UserListProps){
    return (
        <div>
            <DisplayUserListBackground />
            <DisplayUserFriendList />
        </div>
    )
}

const DisplayUserListBackground = (props: {}) => {
    return (
        <div className={styles.userListBackground}></div>
    )
}

const DisplayUserFriendList = (props: {}) => {
    return (
        <div className={styles.friendButton}>
            <span className={styles.friendButtonText}>friends</span>
        </div>
    )
}
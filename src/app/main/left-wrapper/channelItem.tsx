"use client";

import React from 'react';
import styles from './channelItem.module.scss';
import ChannelItemProps from './interfaces/channelItemProps';
import  { DmListProps } from "./interfaces/dmItemProps";

const ChannelItem = (props: ChannelItemProps) => {
  return (
    <div className={styles.channelItemContainer} onClick={() => props.onClick(props.id)}>
      <h3 className={styles.title}>{props.title}</h3>
      <p className={styles.mode}>{props.mode}</p>
    </div>
  );
};

const DmItem = ({
  props,
  onClick,
}:{
  props:DmListProps
  onClick: (targetUid: number) => void;
}) => {
  const unread  :number = props.unread_count;
  return (
    <div className={styles.dmItemContainer} onClick={() => onClick(props.user_uid)}>
      <img
        className={styles.profilePic}
        src={props.user_avatar}
        alt="profile"
        width={30}
        height={30}
        />
      <p className={styles.dmUser}>{props.user_name}</p>
      {(unread > 0) && <div className={styles.unreadBox}>

      </div>}
    </div>
  );
}

export { ChannelItem };
export { DmItem };

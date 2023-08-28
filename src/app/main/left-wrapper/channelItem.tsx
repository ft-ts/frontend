"use client";

import React from 'react';
import styles from './channelItem.module.scss';
import Image from 'next/image';
import classnames from "classnames";
import { UserStatus } from './enum/channel.enum';
import ChannelItemProps from './interfaces/channelItemProps';
import DmItemProps from "./interfaces/dmItemProps";

const ChannelItem = (props: ChannelItemProps) => {
  return (
    <div className={styles.channelItemContainer} onClick={() => props.onClick(props.id)}>
      <h3 className={styles.title}>{props.title}</h3>
      <p className={styles.members}>{props.memberCnt} / 5</p>
      <p className={styles.mode}>{props.mode}</p>
    </div>
  );
};

const DmItem = (props: DmItemProps) => {
  const itemClasses = classnames(styles.dmItemContainer, {
    [styles.online]: props.state === UserStatus.ONLINE,
    [styles.offline]: props.state === UserStatus.OFFLINE,
    [styles.inGame]: props.state === UserStatus.IN_GAME,
    [styles.deactivated]: props.state === UserStatus.DEACTIVATED,
  });

  const stateText = (() => {
    switch (props.state) {
      case UserStatus.ONLINE:
        return 'Online';
      case UserStatus.OFFLINE:
        return 'Offline';
      case UserStatus.IN_GAME:
        return 'In Game';
      case UserStatus.DEACTIVATED:
        return 'Deactivated';
      default:
        return 'Unknown';
    }
  })();

  return (
    <div className={classnames(styles.dmItemContainer, itemClasses)} onClick={() => props.onClick(props.targetUid)}>
      <Image
        className={styles.profilePic}
        src={props.profile}
        alt="profile"
        width={30}
        height={30}
        />
      <p className={styles.dmUser}>{props.friend}</p>
      <p className={styles.dmState}>{stateText}</p>
    </div>
  );
}

export { ChannelItem };
export { DmItem };

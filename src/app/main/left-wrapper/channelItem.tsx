import React from 'react';
import styles from './channelItem.module.scss';
import Image from 'next/image';
import classnames from "classnames";
import { UserStatus } from './enum/temp.enum';
import ChannelItemProps from './interfaces/channelItemProps';
import DmItemProps from "./interfaces/dmItemProps";

const ChannelItem: React.FC<ChannelItemProps> = ({ title, members, mode, channelId, onClick }) => {
  return (
    <div className={styles.channelItemContainer} onClick={() => onClick(channelId)}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.members}>{members} / 4</p>
      <p className={styles.mode}>{mode}</p>
    </div>
  );
};

const DmItem: React.FC<DmItemProps> = ({ friend, profile, state, targetUid, onClick }) => {
  const itemClasses = classnames(styles.dmItemContainer, {
    [styles.online]: state === UserStatus.ONLINE,
    [styles.offline]: state === UserStatus.OFFLINE,
    [styles.inGame]: state === UserStatus.IN_GAME,
    [styles.deactivated]: state === UserStatus.DEACTIVATED,
  });

  const stateText = (() => {
    switch (state) {
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
    <div className={classnames(styles.dmItemContainer, itemClasses)} onClick={() => onClick(targetUid)}>
      <Image
        className={styles.profilePic}
        src={profile}
        alt="profile"
        width={30}
        height={30}
        />
      <p className={styles.dmUser}>{friend}</p>
      <p className={styles.dmState}>{stateText}</p>
    </div>
  );
}

export { ChannelItem };
export { DmItem };

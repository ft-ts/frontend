import React from 'react';
import styles from './channelItem.module.scss';

interface ChannelItemProps {
  title: string;
  members: number;
  mode: string;
}

const ChannelItem: React.FC<ChannelItemProps> = ({ title, members, mode }) => {
  return (
    <div className={styles.channelItemContainer}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.members}>{members} / 4</p>
      <p className={styles.mode}>{mode}</p>
    </div>
  );
};

export default ChannelItem;

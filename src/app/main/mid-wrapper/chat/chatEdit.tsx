'use client';

import React, { useState } from 'react';
import styles from './edit.module.scss';
import { useGlobalContext } from '@/app/Context/store';
import { ChannelMode } from '@/app/main/left-wrapper/enum/channel.enum';
import ChannelProps from '../../left-wrapper/interfaces/channelProps';
import { postChannelUpdate } from '@/app/axios/client';
import { socket } from '../../components/CheckAuth';

export default function ChatEdit({
  channel,
  onClose,
}: {
  channel: ChannelProps
  onClose: () => void;
}) {
  const [ newTitle, setNewTitle] = useState(channel.title);
  const [ errorMessageTitle, setErrorMessageTitle ] = useState('');
  const [ errorMessagePassword, setErrorMessagePassword ] = useState('');
  const [ mode, setMode ] = useState(channel.mode);
  const [ password, setPassword ] = useState('');

  const { currentChannelId }: any = useGlobalContext();
  const { setIsNotificationVisible }: any = useGlobalContext();
  const { setErrorMessage }: any = useGlobalContext();

  const handleUpdate = () => {
    if (currentChannelId === null) return ;
    setErrorMessageTitle('');
    setErrorMessagePassword('');
    if (!newTitle) {
      setErrorMessageTitle('Please fill out title fields.');
      return;
    } else if (newTitle.length > 15) {
      setErrorMessageTitle('Title must be less than 15 characters.');
      return;
    } else if (mode === ChannelMode.PROTECTED && (password.length > 15 || password.length < 4)) {
      setErrorMessagePassword('Password must be between 4 and 15 characters.');
      return;
    }
    postChannelUpdate(currentChannelId, newTitle, mode, password).then((res) => {
        socket.emit('update/channelInfo');
        socket.emit('channel/chatRoomUpdate', {channelId: currentChannelId});
      }).catch((err) => {
        setErrorMessage('Channel update failed.');
        setIsNotificationVisible(true);
        setTimeout(() => {
          setIsNotificationVisible(false);
          setErrorMessage('');
        }, 3000);
      });
    onClose();
  }

  return (
    <div className={styles.editFormContainer}>
      <h2 className={styles.editFormFont}>Edit Channel</h2>
      <h3 className={styles.editFormFont}>Channel Title</h3>
      <input
        type="text"
        placeholder={channel.title}
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        className={styles.editFormInput}
      />
      {errorMessageTitle && <p className={styles.error}>{errorMessageTitle}</p>}
      <h3 className={styles.editFormFont}>Mode</h3>
      <div className={styles.radioGroup}>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="mode"
            value="public"
            checked={mode === ChannelMode.PUBLIC}
            onChange={() => setMode(ChannelMode.PUBLIC)}
          />
          Public
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="mode"
            value="protected"
            checked={mode === ChannelMode.PROTECTED}
            onChange={() => setMode(ChannelMode.PROTECTED)}
          />
          Protected
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="mode"
            value="private"
            checked={mode === ChannelMode.PRIVATE}
            onChange={() => setMode(ChannelMode.PRIVATE)}
          />
          Private
        </label>
      </div>
      {mode === ChannelMode.PROTECTED && (
        <>
          <h3>Password</h3>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.editFormInput}
          />
          {errorMessagePassword && <p className={styles.error}>{errorMessagePassword}</p>}
        </>
      )}
      <div className={styles.buttonContainer}>
        <button className={styles.editFormButton} onClick={handleUpdate}>Update</button>
        <button className={styles.buttonCancel} onClick={onClose}>Cancel</button>
      </div>
    </div>
  )
}

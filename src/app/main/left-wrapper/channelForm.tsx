'use client';

import React, { useState } from 'react';
import styles from './channelForm.module.scss';
import ChannelFormProps from './interfaces/channelFormProps';
import { ChannelMode } from './enum/channel.enum';
import { useGlobalContext, TabOptions} from '@/app/Context/store';
import { postCreateChannel } from '@/app/axios/client';
import { ChannelRole } from '../mid-wrapper/chat/enum/channelRole.enum';
import { socket } from '../components/CheckAuth';

const ChannelForm = (props: ChannelFormProps) => {
  const { setCurrentChannelId }: any = useGlobalContext();
  const { setCurrentChannel }: any = useGlobalContext();
  const { setCurrentDmId }: any = useGlobalContext();
  const { setMyRole }: any = useGlobalContext();
  const { setActiveTab }: any = useGlobalContext();
  const [title, setTitle] = useState('');
  const [mode, setMode] = useState(ChannelMode.PUBLIC);
  const [password, setPassword] = useState('');
  const [isProtectedMode, setIsProtectedMode] = useState(false);
  const [errorMessageTitle, setErrorMessageTitle] = useState('');
  const [errorMessagePassword, setErrorMessagePassword] = useState('');
  const { isNotificationVisible, setIsNotificationVisible }: any = useGlobalContext();
  const { errorMessage, setErrorMessage }: any = useGlobalContext();

  const handleCreateChannel = () => {
    setCurrentDmId(null);
    if (!title) {
      setErrorMessageTitle('Please fill out title fields.');
      return;
    }
    if (title.length > 15) {
      setErrorMessageTitle('Title must be less than 15 characters.');
      return;
    }
    if (isProtectedMode && (password.length > 15 || password.length < 4)) {
      setErrorMessagePassword('Password must be between 4 and 15 characters.');
      return;
    }
    postCreateChannel(title, mode, password).then((res) => {
      const {data} = res;
      setCurrentChannel(data);
      setCurrentChannelId(data.id);
      setMyRole(ChannelRole.OWNER);
      setActiveTab(TabOptions.CHANNEL);
      socket.emit('update/channelInfo');
    }).catch((err) => {
      setErrorMessage(err);
      setIsNotificationVisible(true);
      setTimeout(() => {
        setIsNotificationVisible(false);
      }, 3000);
    });
    props.onClose();
  };

  const handleModeChange = (newMode: ChannelMode) => {
    setMode(newMode);
    setIsProtectedMode(newMode === ChannelMode.PROTECTED ? true : false);
  };

  return (
    <div className={styles.channelFormContainer}>
      <h2 className={styles.h2}>Create Channel</h2>
      <h3 className={styles.h3}>Channel Title</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.input}
        maxLength={15}
      />
      {errorMessageTitle && <p className={styles.error}>{errorMessageTitle}</p>}
      <h3 className={styles.h3}>Mode</h3>
      <div className={styles.radioGroup}>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            value="Public"
            checked={mode === ChannelMode.PUBLIC}
            onChange={() => handleModeChange(ChannelMode.PUBLIC)}
          />
          Public
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            value="Protected"
            checked={mode === ChannelMode.PROTECTED}
            onChange={() => handleModeChange(ChannelMode.PROTECTED)}
          />
          Protected
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            value="Private"
            checked={mode === ChannelMode.PRIVATE}
            onChange={() => handleModeChange(ChannelMode.PRIVATE)}
          />
          Private
        </label>
      </div>
      {isProtectedMode && (
        <div>
          <h3 className={styles.h3}>Password</h3>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            maxLength={15}
          />
        {errorMessagePassword && <p className={styles.error}>{errorMessagePassword}</p>}
        </div>
      )}
      <div className={styles.buttonContainer}>
        <button onClick={handleCreateChannel} className={styles.buttonCreate}>Create</button>
        <button onClick={props.onClose} className={styles.buttonCancel}>Cancel</button>
      </div>
    </div>
  );
};

export { ChannelForm };

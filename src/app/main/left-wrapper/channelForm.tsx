"use client";

import React, { useState } from 'react';
import styles from './channelForm.module.scss';
import ChannelSettingFormProps from './interfaces/channelSettingFormProps';
import ChannelFormProps from './interfaces/channelFormProps';
import { ChannelMode } from './enum/channel.enum';
import { socket } from '../components/CheckAuth';
import { useGlobalContext } from '@/app/Context/store';
import ChannelProps from './interfaces/channelProps';

const ChannelForm = (props: ChannelFormProps) => {
  const { setChannelId }: any = useGlobalContext();
  const [title, setTitle] = useState('');
  const [mode, setMode] = useState(ChannelMode.PUBLIC);
  const [password, setPassword] = useState('');
  const [isProtectedMode, setIsProtectedMode] = useState(false);
  const [errorMessageTitle, setErrorMessageTitle] = useState('');
  const [errorMessagePassword, setErrorMessagePassword] = useState('');

  const handleCreateChannel = () => {
    if (!title) {
      setErrorMessageTitle('Please fill out title fields.');
      return;
    }
    if (title.length > 15) {
      setErrorMessageTitle('Title must be less than 15 characters.');
      return;
    }
    if (isProtectedMode && password.length > 15 && password.length < 4) {
      setErrorMessagePassword('Password must be between 4 and 15 characters.');
      return;
    }

    socket.emit('channel/createChannel', {
      title,
      mode,
      password,
    });
    socket.on('channel/createChannel', 
    (data) => setChannelId(data));

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

const ChannelSettingForm = (props: ChannelSettingFormProps) => {
  const [newTitle, setNewTitle] = useState(props.channel.title);
  const [newPassword, setPassword] = useState('');
  const [errorMessageTitle, setErrorMessageTitle] = useState('');
  const [errorMessagePassword, setErrorMessagePassword] = useState('');
  const { setChannel }: any = useGlobalContext();

  const handleUpdate = () => {
    if ((newTitle.length <= 1) || (newTitle.length >= 16)) {
      setErrorMessageTitle('Length of title must be greater than 1 and less than 16.');
      return ;
    }
    socket.emit('channel/editTitle', {
      channelId: props.channel.id,
      title: newTitle,
    });

    if (props.channel.mode === ChannelMode.PROTECTED)
    {
      if (!!!newPassword || newPassword.length <= 3 || newPassword.length >= 16) 
      {
        setErrorMessagePassword('Length of password must be greater than 3 and less than 15.');
        return ;
      }
      socket.emit('channel/editPassword', {
        channelId: props.channel.id,
        password: newPassword,
      });
    }
    socket.on("channel/channelUpdate", (channelData: ChannelProps) => {
      setChannel(channelData);
    }
    );
    props.onClose();
  };

  return (
    <div className={styles.channelFormContainer}>
      <h2 className={styles.h2}>Channel Settings</h2>
      {props.channel.id && (
        <>
          <h3 className={styles.h3}>Channel Title</h3>
          <input
            type="text"
            placeholder={props.channel.title}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className={styles.input}
          />
          {errorMessageTitle && <p className={styles.error}>{errorMessageTitle}</p>}
          {props.channel.mode === ChannelMode.PROTECTED && (
            <>
              <h3 className={styles.h3}>Password</h3>
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
              />
              {errorMessagePassword && <p className={styles.error}>{errorMessagePassword}</p>}
            </>
          )}
          <div className={styles.buttonContainer}>
            <button onClick={handleUpdate} className={styles.buttonCreate}>Edit</button>
            <button onClick={props.onClose} className={styles.buttonCancel}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
};


export { ChannelForm, ChannelSettingForm };

"use client";

import React, { useState } from 'react';
import styles from './channelForm.module.scss';
import { Socket } from 'socket.io-client';
import ChannelSettingFormProps from './interfaces/channelSettingFormProps';
import ChannelFormProps from './interfaces/channelFormProps';

const ChannelForm = (props: ChannelFormProps) => {
  const [title, setTitle] = useState('');
  const [mode, setMode] = useState('Public');
  const [password, setPassword] = useState('');
  const [isProtectedMode, setIsProtectedMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleCreateChannel = () => {
    if (!title) {
      setErrorMessage('Please fill out all required fields.');
      return;
    }
    if (title.length > 20) {
      setErrorMessage('Title must be less than 20 characters.');
      return;
    }
    if (isProtectedMode && password.length > 15 && password.length < 4) {
      setErrorMessage('Password must be between 4 and 15 characters.');
      return;
    }

    props.socket.emit('createChannel', {
      title,
      mode,
      password,
    });
    props.onClose();
  };

  const handleModeChange = (newMode: string) => {
    setMode(newMode);
    setIsProtectedMode(newMode === 'Protected' ? true : false);
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
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      <h3 className={styles.h3}>Mode</h3>
      <div className={styles.radioGroup}>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            value="Public"
            checked={mode === 'Public'}
            onChange={() => handleModeChange('Public')}
          />
          Public
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            value="Protected"
            checked={mode === 'Protected'}
            onChange={() => handleModeChange('Protected')}
          />
          Protected
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            value="Private"
            checked={mode === 'Private'}
            onChange={() => handleModeChange('Private')}
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
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
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
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUpdatePassword = () => {
    if (props.channel.password && password.length > 0) {
      // Send the updated password to the server
      props.socket.emit('editPassword', {
        channelId: props.channel,
        password,
      });
    } else {
      setErrorMessage('Please enter a valid password.');
    }
  };

  const handleUpdateTitle = () => {
    if (props.channel.id && newTitle.length > 0) {
      // Send the updated title to the server
      props.socket.emit('updateChannelTitle', {
        channelId: props.channel.id,
        title: newTitle,
      });
    } else {
      setErrorMessage('Please enter a valid title.');
    }
  };

  return (
    <div className={styles.channelFormContainer}>
      <h2 className={styles.h2}>Channel Settings</h2>
      {props.channel.id && (
        <>
          <h3 className={styles.h3}>Channel Title</h3>
          <input
            type="text"
            placeholder="New Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className={styles.input}
          />
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          <h3 className={styles.h3}>Password</h3>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <div className={styles.buttonContainer}>
            <button onClick={handleUpdateTitle} className={styles.buttonCreate}>Update Title</button>
            <button onClick={handleUpdatePassword} className={styles.buttonCreate}>Update Password</button>
            <button onClick={props.onClose} className={styles.buttonCancel}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
};

export { ChannelForm, ChannelSettingForm };

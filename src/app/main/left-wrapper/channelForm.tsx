"use client";

import React, { useState } from 'react';
import styles from './channelForm.module.scss';

interface ChannelFormProps {
  onClose: () => void;
}
const ChannelForm: React.FC<ChannelFormProps> = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [mode, setMode] = useState('');
  const [password, setPassword] = useState('');
  const [isProtectedMode, setIsProtectedMode] = useState(false);

  const handleCreateChannel = () => {
    // 실제로 채널을 생성하는 로직을 작성합니다.
    // 입력받은 title, mode, password를 사용하여 채널을 생성합니다.
    // ...

    // 채널 생성 후 창을 닫습니다.
    onClose();
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
        </div>
      )}
      <div className={styles.buttonContainer}>
        <button onClick={handleCreateChannel} className={styles.buttonCreate}>Create</button>
        <button onClick={onClose} className={styles.buttonCancel}>Cancel</button>
      </div>
    </div>
  );
};

export { ChannelForm };

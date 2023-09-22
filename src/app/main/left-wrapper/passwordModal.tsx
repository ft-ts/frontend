'use client';

import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import styles from './channelForm.module.scss';
import { useGlobalContext } from '@/app/Context/store';
import { socket } from '../components/CheckAuth';
import ChannelProps from './interfaces/channelProps';

interface HookFormTypes {
  password: string,
}

export default function PasswordModal({
  isOpen,
  onRequestClose,
  setChannelErrorMessage,
  channelErrorMessage,
  setIsChannelNotificationVisible,
  tempChannelId,
}:{
  isOpen: boolean,
  onRequestClose: () => void,
  setChannelErrorMessage: (message: string | null) => void,
  channelErrorMessage: string | null
  setIsChannelNotificationVisible: (isVisible: boolean) => void
  tempChannelId: number | null
}){
  const [password, setPassword] = useState<string>('');
  const { register, handleSubmit } = useForm<HookFormTypes>();

  const customStyles = {
    content: {
      width: '500px',
      height: '170px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
      margin: '0 auto',
      backgroundColor: '#444444',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
    },
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onVaild = async ( password: HookFormTypes ) => {
    if (!tempChannelId) {
      return;
    }
    const pwd = password.password;
    
    socket.emit('channel/join', { channelId: tempChannelId, password: pwd });
    onRequestClose();
  }

  const onInvalid = (error : any) => {
    console.log('my',error);
  }

  return (
    <Modal
      isOpen={isOpen}
      contentLabel='Password Modal'
      style={customStyles}
      ariaHideApp={false}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={false}
    >
      <ChannelEnterForm
        password={password}
        handlePasswordChange={handlePasswordChange}
        handleSubmit={handleSubmit(onVaild, onInvalid)}
        onRequestClose={onRequestClose}
        register={register}
      />
    </Modal>
  );
};

const ChannelEnterForm = ({
  password,
  handlePasswordChange,
  handleSubmit,
  onRequestClose,
  register,
}: any) => {
  return (
    <div className={styles.channelEnterContainer}>
      <h2 className={styles.h2}>Enter Password</h2>
      <button className={styles.closeButton} onClick={onRequestClose}>
        X
      </button>
      <div className={styles.passwordContainer}>
        <input
          className={styles.input}
          type='password'
          placeholder='Password'
          onChange={handlePasswordChange}
          {...register('password', { required: true })}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault(); // Prevent default behavior (form submission)
              handleSubmit();
            }}}
        />
        <button className={styles.submitButton} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

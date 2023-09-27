'use client';
// Todo edit this file
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import styles from './channelForm.module.scss';
import { useGlobalContext, TabOptions } from '@/app/Context/store';
import { socket } from '../components/CheckAuth';
import ChannelProps from './interfaces/channelProps';
import { joinChannel } from '@/app/axios/client';

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
  const { setCurrentChannel }: any = useGlobalContext();
  const { setCurrentChannelId }: any = useGlobalContext();
  const { setActiveTab }: any = useGlobalContext();
  const { setMyRole }: any = useGlobalContext();
  const { myInfo }: any = useGlobalContext();
  const { setErrorMessage }: any = useGlobalContext();
  const { setIsNotificationVisible }: any = useGlobalContext();
  const { setCurrentUser }: any = useGlobalContext();

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
    joinChannel(tempChannelId, pwd).then((res) => {
      const { data } = res;
      console.log(data.channel, data.role, data.isMember );
      setCurrentChannel(data.channel);
      setCurrentChannelId(data.channel.id);
      setActiveTab(TabOptions.CHANNEL);
      setMyRole(data.role);
      if (!data.isMember){
        socket.emit('channel/sendMessage', {
          channelId: data.channel.id,
          content: `${myInfo.name} has joined the channel.`,
          isNotice: true,
        });
        socket.emit('channel/innerUpdate', { channelId: data.channel.id });
      }
    }).catch((err) => {
      setActiveTab(TabOptions.ALL);
      setCurrentChannel(null);
      setCurrentChannelId(null);
      setErrorMessage(err.response.data.message);
      setIsNotificationVisible(true);
      setTimeout(() => {
        setIsNotificationVisible(false);
        setErrorMessage("");
      }, 3000);
    });
    onRequestClose();
  }

  const onInvalid = (error : any) => {
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
            maxLength={15}
        />
        <button className={styles.submitButton} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

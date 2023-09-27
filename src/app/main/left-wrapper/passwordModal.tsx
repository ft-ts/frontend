'use client';

import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import styles from './channelForm.module.scss';
import { useGlobalContext, TabOptions } from '@/app/Context/store';
import { socket } from '../components/CheckAuth';
import { joinChannel } from '@/app/axios/client';

export default function PasswordModal({
  isOpen,
  onRequestClose,
  tempChannelId,
}:{
  isOpen: boolean,
  onRequestClose: () => void,
  tempChannelId: number | null
}){
  const [password, setPassword] = useState<string>('');
  const { setCurrentChannel }: any = useGlobalContext();
  const { setCurrentChannelId }: any = useGlobalContext();
  const { setActiveTab }: any = useGlobalContext();
  const { setMyRole }: any = useGlobalContext();
  const { myInfo }: any = useGlobalContext();
  const { setErrorMessage }: any = useGlobalContext();
  const { setIsNotificationVisible }: any = useGlobalContext();

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
      zIndex: 500,
    },
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async () => {
    if (!tempChannelId) {
      return;
    }
    console.log(password);
    joinChannel(tempChannelId, password).then((res) => {
      const { data } = res;
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
        socket.emit('channel/joinUpdate', { channelId: data.channel.id });
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
    setPassword('');
    onRequestClose();
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
        handlePasswordChange={handlePasswordChange}
        handleSubmit={handleSubmit}
        onRequestClose={onRequestClose}
      />
    </Modal>
  );
};

const ChannelEnterForm = ({
  handlePasswordChange,
  handleSubmit,
  onRequestClose,
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

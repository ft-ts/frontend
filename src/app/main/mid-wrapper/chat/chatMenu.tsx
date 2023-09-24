'use client';

import styles from './chat-wrapper.module.scss';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import ChatEdit from './chatEdit';
import ChannelProps from '../../left-wrapper/interfaces/channelProps';
import { socket } from '../../components/CheckAuth';
import { useGlobalContext } from '@/app/Context/store';
import { TabOptions } from '@/app/Context/store';
import { ChannelRole } from './enum/channelRole.enum';
import UserInterface from '@/app/axios/interfaces/user.interface';
import { getUserByUid } from '@/app/axios/client';

export default function ChatMenu() {
  const { currentChannelId }: any = useGlobalContext();
  const { currentDmId }: any = useGlobalContext();
  const { currentChannel }: any = useGlobalContext();
  const { myRole } : any = useGlobalContext();
  const { isNotificationVisible, setIsNotificationVisible }: any = useGlobalContext();
  const { errorMessage, setErrorMessage }: any = useGlobalContext();

  const [dmTargetUser, setDmTargetUser] = useState<UserInterface | null>(null);

  useEffect(() => {
    if (currentDmId === null) {
      return;
    }
    getUserByUid(currentDmId).then((res) => {
      setDmTargetUser(res.data);
    }).catch((err) => {
      setErrorMessage(err);
      setIsNotificationVisible(true);
      setTimeout(() => {
        setIsNotificationVisible(false);
      }, 3000);
    });
    return () => {
    };
  }, [currentDmId]);

  return (
    <div className={styles.chatMenuBox}>
      {currentChannelId && (
        <span>
          <UserlistButton />
          <h2 className={styles.chatMenuTitle}>{currentChannel?.title}</h2>
          {(myRole === ChannelRole.OWNER) && (
            <ChatSettingButton channel={currentChannel} />
          )}
          <CloseButton />
          <ExitButton />
        </span>
      )}
      {currentDmId && (
        <span>
          <h2 className={styles.chatMenuTitle}> DM with: <span style={{ color: 'skyblue' }}>{dmTargetUser?.name}</span></h2>
          <CloseButton />
        </span>
      )}
    </div>
  );
}

const CloseButton = () => {
  const { setCurrentChannelId }: any = useGlobalContext();
  const { setCurrentDmId }: any = useGlobalContext();
  const { activeTab, setActiveTab }: any = useGlobalContext();
  const { setCurrentUser }: any = useGlobalContext();
  const { myInfo }: any = useGlobalContext();

  const handleCloseChannel = () => {
    if (activeTab !== TabOptions.ALL) {
      setActiveTab(TabOptions.ALL);
    }
    setCurrentChannelId(null);
    setCurrentDmId(null);
    setCurrentUser(myInfo);
  };

  return (
    <button className={styles.closeButton} onClick={handleCloseChannel}>
      <img
        src='/asset/closeIcon.svg'
        alt='close button'
        width={55}
        height={55}
      />
    </button>
  );
};

const ExitButton = () => {
  const { currentChannelId, setCurrentChannelId }: any = useGlobalContext();
  const { setCurrentChannel }: any = useGlobalContext();
  const { activeTab, setActiveTab }: any = useGlobalContext();
  const { setCurrentUser }: any = useGlobalContext();
  const { myInfo }: any = useGlobalContext();

  const handleExitChannel = () => {
    socket.emit('channel/leaveChannel', { channelId: currentChannelId });
    if (activeTab !== TabOptions.ALL) {
      setActiveTab(TabOptions.ALL);
    }
    socket.emit('channel/sendMessage', {
      channelId: currentChannelId,
      content: `${myInfo.name} has left the channel`,
      isNotice: true,
    })
    setCurrentChannelId(null);
    setCurrentChannel(null);
    setCurrentUser(myInfo);
  };

  return (
    <button className={styles.exitButton} onClick={handleExitChannel}>
      <img
        src='/asset/exitIcon.svg'
        alt='exit button'
        width={55}
        height={55}
      />
    </button>
  );
};

const ChatSettingButton = ({ channel }: { channel: ChannelProps }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const customStyles = {
    content: {
      width: '400px',
      height: '700px',
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
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <button className={styles.settingButton} onClick={handleOpenModal}>
        <img
          src='/asset/setting.svg'
          alt='settingButton'
          width={55}
          height={55}
        />
      </button>
      <Modal
        isOpen={isModalOpen}
        contentLabel='Edit Channel Modal'
        style={customStyles}
        ariaHideApp={false}
        onRequestClose={handleCloseModal}
        shouldCloseOnOverlayClick={false}
      >
        <ChatEdit channel={channel} onClose={handleCloseModal}/>
      </Modal>
    </div>
  );
};

const UserlistButton = () => {
  const { setActiveTab }: any = useGlobalContext();

  const handleUserlist = () => {
    setActiveTab(TabOptions.CHANNEL);
  };

  return (
    <button className={styles.userlistButton} onClick={handleUserlist}>
      <img
        src='/asset/memberIcon.svg'
        alt='userlist button'
        width={55}
        height={55}
      />
    </button>
  );
};

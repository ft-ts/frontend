"use client";

import React, { useState, useEffect } from "react";
import { ChannelTabOptions } from "./enum/channelTabOptions.enum";
import styles from "./channel.module.scss";
import { ChannelItem } from "./channelItem";
import Modal from "react-modal";
import { ChannelForm } from "./channelForm";
import ChannelItemProps from "./interfaces/channelItemProps";
import PasswordModal from "./passwordModal";
import { socket } from "../components/CheckAuth";
import { useGlobalContext, TabOptions } from "@/app/Context/store";
import { getChannelList, getMyChannelList, joinChannel } from "@/app/axios/client";

function Channel() {
  const [selectedTab, setSelectedTab] = useState(ChannelTabOptions.ALL);
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [tempChannelId, setTempChannelId] = useState<number | null>(null);
  const [channels, setChannels] = useState<ChannelItemProps[]>([]);

  const { setActiveTab }: any = useGlobalContext();
  const { setMyRole }: any = useGlobalContext();
  const { setCurrentDmId }: any = useGlobalContext();
  const { currentChannel, setCurrentChannel }: any = useGlobalContext();
  const { currentChannelId, setCurrentChannelId }: any = useGlobalContext();
  const { myInfo }: any = useGlobalContext();
  const { isNotificationVisible, setIsNotificationVisible }: any = useGlobalContext();
  const { errorMessage, setErrorMessage }: any = useGlobalContext();
  const { setIsNewMyChannel }: any = useGlobalContext();
  const { channelFlag } : any = useGlobalContext();

  const handleTabClick = (tab: ChannelTabOptions) => {
    setSelectedTab(tab);
  };

  const setChannelLists = () => {
    setChannels([]);
    if (selectedTab === ChannelTabOptions.ALL) {
      getChannelList().then((res) => {
        const { data } = res;
        setChannels(data);
      }).catch((err) => {
        setErrorMessage('Error occured while getting channel list');
        setIsNotificationVisible(true);
        setTimeout(() => {
          setIsNotificationVisible(false);
          setErrorMessage("");
        }, 2000);
      });
    } else if (selectedTab === ChannelTabOptions.MY) {
      getMyChannelList().then((res) => {
        const { data } = res;
        setChannels(data);
      }).catch((err) => {
        setErrorMessage('Error occured while getting my channel list');
        setIsNotificationVisible(true);
        setTimeout(() => {
          setIsNotificationVisible(false);
          setErrorMessage("");
        }, 2000);
      });
    }
  }

  useEffect(() => {
    setChannelLists();
  }, [selectedTab]);

  useEffect(() => {
    socket.on('update/channelInfo', () => {
      setChannelLists();
    });
    socket.on('channel/invite', (channelId: number) => {
      socket.emit('channel/invite/accept', { channelId });
      setIsNewMyChannel(true);
    })
    return () => {
      socket.off('update/channelInfo');
      socket.off('channel/invite');
    }
  }, [selectedTab]);

  const handleChannelClick = async (chId: number) => {
    setCurrentDmId(null);
    const channel = channels.find((ch) => ch.id === chId);
    if (!channel) return ;
    else if (currentChannelId === chId) return;
  
    joinChannel(chId, '').then((res) => {
      const { data } = res;
      setCurrentChannel(data.channel);
      setCurrentChannelId(data.channel.id);
      setActiveTab(TabOptions.CHANNEL);
      setMyRole(data.role);
      if (!data.isMember) {
        socket.emit('channel/sendMessage', {
          channelId: data.channel.id,
          content: `${myInfo.name} has joined the channel.`,
          isNotice: true,
        });
        socket.emit('channel/joinUpdate', { channelId: data.channel.id });
      }
    }).catch((err) => {
      if (err.response.data.message === 'Password is required for a PROTECTED channel.') {
        setShowPasswordModal(true);
        setTempChannelId(chId);
      } else {
        setActiveTab(TabOptions.ALL);
        setCurrentChannel(null);
        setCurrentChannelId(null);
        setErrorMessage(err.response.data.message);
        setIsNotificationVisible(true);
        setTimeout(() => {
          setIsNotificationVisible(false);
          setErrorMessage("");
        }, 3000);
      }
    });
  };

  return (
    <div className={styles.channelWrapper}>
      <CreateChannel />
      <ChannelPanels
        handleTabClick={handleTabClick}
        selectedTab={selectedTab}
      />
      <div className={styles.channelContainer}>
        {channels?.map && channels.map((channel) => (
          <ChannelItem
            key={channel.id}
            title={channel.title}
            mode={channel.mode}
            id={channel.id}
            onClick={() => handleChannelClick(channel.id)}
          />
        ))}
      </div>
      {isNotificationVisible && (
        <div className={styles.notification}>
          <p>{errorMessage}</p>
        </div>
      )
      }
      <PasswordModal
        isOpen={showPasswordModal}
        onRequestClose={() => {
          setShowPasswordModal(false)
        }}
        tempChannelId={tempChannelId}
      />
    </div >
  );
}

const CreateChannel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const customStyles = {
    content: {
      width: "400px",
      height: "700px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "20px",
      margin: "0 auto",
      backgroundColor: "#444444",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
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
      <button className={styles.createChannelBox} onClick={handleOpenModal}>
        <h2 className={styles.createChannelFont}>Create Channel</h2>
      </button>
      <Modal
        isOpen={isModalOpen}
        contentLabel="Create Channel Modal"
        style={customStyles}
        ariaHideApp={false}
        onRequestClose={handleCloseModal}
        shouldCloseOnOverlayClick={false}
      >
        <ChannelForm onClose={handleCloseModal} />
      </Modal>
    </div>
  );
};

const ChannelPanels = ({
  handleTabClick,
  selectedTab,
}: {
  handleTabClick: (tab: ChannelTabOptions) => void;
  selectedTab: ChannelTabOptions;
}) => {
  const { isNewMyChannel, setIsNewMyChannel }: any = useGlobalContext();
  return (
    <div>
      <div className={styles.channelPanelBox}>
        <h2 className={styles.channelPanelFont}>Channels</h2>
      </div>
      <div className={styles.channelButtonsWrapper}>
        <button
          className={`${styles.unselectedPanelTab} ${selectedTab === ChannelTabOptions.ALL ? styles.selectedPanelTab : ""
            }`}
          onClick={() => {handleTabClick(ChannelTabOptions.ALL)
          }}>
          <h2 className={`${styles.selectPanelFont}`}>ALL</h2>
        </button>
        <button
          className={`${styles.unselectedPanelTab} ${selectedTab === ChannelTabOptions.MY ? styles.selectedPanelTab : ""
            }`}
          onClick={() => {handleTabClick(ChannelTabOptions.MY)
          setIsNewMyChannel(false)
          }}>
          <h2 className={`${styles.selectPanelFont}`}>MY</h2>
          <div className={styles.newChannelDotWrapper}>
            {isNewMyChannel && <div className={styles.newChannelDot}>
              </div>}
          </div>
          </button>
      </div>
    </div>
  );
};

export default Channel;

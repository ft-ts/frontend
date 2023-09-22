"use client";

import React, { useState, useEffect } from "react";
import { ChannelTabOptions } from "./enum/channelTabOptions.enum";
import Image from "next/image";
import styles from "./channel.module.scss";
import { ChannelItem } from "./channelItem";
import Modal from "react-modal";
import { ChannelForm } from "./channelForm";
import ChannelItemProps from "./interfaces/channelItemProps";
import PasswordModal from "./passwordModal";
import { socket } from "../components/CheckAuth";
import { useGlobalContext, TabOptions } from "@/app/Context/store";
import ChannelProps from "./interfaces/channelProps";
import { getMyChannelRole, getChannelList, getMyChannelList } from "@/app/axios/client";
import { get } from "http";

function Channel()
{
  const [selectedTab, setSelectedTab] = useState(ChannelTabOptions.ALL);
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [channelErrorMessage, setChannelErrorMessage] = useState<string | null>(null);
  const [isChannelNotificationVisible, setIsChannelNotificationVisible ] = useState<boolean>(false);
  const [ tempChannelId, setTempChannelId ] = useState<number | null>(null);

  const { setActiveTab }: any = useGlobalContext();
  const { setMyRole }: any = useGlobalContext();
  const { setCurrentDmId }: any = useGlobalContext();
  const { currentChannel, setCurrentChannel } : any = useGlobalContext();
  const { currentChannelId, setCurrentChannelId }: any = useGlobalContext();


  const channels = useChannelData(selectedTab);
  const handleTabClick = (tab: ChannelTabOptions) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    if (currentChannel === null) {
      return;
    }
    socket.on('channel/join/success', async (channelData: ChannelProps) => {
      setCurrentChannel(channelData);
      setCurrentChannelId(channelData.id);
      setActiveTab(TabOptions.CHANNEL);
      await getMyChannelRole(channelData.id).then((res) => {
        const { data } = res;
        setMyRole(data);
      }).catch((err) => {
        console.log('setMyrole', err);
      });
    });
    socket.on('channel/join/fail', (data: { message: string }) => {
      if (data.message === 'Password is required for a PROTECTED channel.') {
        setShowPasswordModal(true);
        setTempChannelId(currentChannel.id);
      } else {
        setActiveTab(TabOptions.ALL);
        setCurrentChannel(null);
        setCurrentChannelId(null);
        setChannelErrorMessage(data.message);
        setIsChannelNotificationVisible(true);
        setTimeout(() => {
          setIsChannelNotificationVisible(false);
        }, 3000);
      }
    });
    return () => {
      socket.off("channel/join/success");
      socket.off("channel/join/error");
    }
  }, [currentChannel]);


  const handleChannelClick = async (chId: number) => {
    setCurrentDmId(null);
    const channel = channels.find((ch) => ch.id === chId);
    if (!channel) {
      return;
    } else if (currentChannelId === chId) return ;
    socket.emit('channel/join', { channelId: chId, password: '' });
    setCurrentChannel(channel);
  };

  return (
    <div className={styles.channelWrapper}>
      <CreateChannel />
      <ChannelPanels
        handleTabClick={handleTabClick}
        selectedTab={selectedTab}
      />
      <DisplayChannelSearch />
      <div className={styles.channelContainer}>
        {channels &&
          channels.map((channel) => (
            <ChannelItem
              key={channel.id}
              title={channel.title}
              memberCnt={channel.memberCnt}
              mode={channel.mode}
              id={channel.id}
              onClick={() => handleChannelClick(channel.id)}
            />
          ))}
      </div>
      {isChannelNotificationVisible && (
        <div className={styles.notification}>
          <p>{channelErrorMessage}</p>
        </div>
      )}
      <PasswordModal
        isOpen={showPasswordModal}
        onRequestClose={() => { 
          setShowPasswordModal(false)
        }}
        setChannelErrorMessage={setChannelErrorMessage}
        channelErrorMessage={channelErrorMessage}
        setIsChannelNotificationVisible={setIsChannelNotificationVisible}
        tempChannelId={tempChannelId}
      />
    </div>
  );
}

const useChannelData = (tab: ChannelTabOptions) => {
  const [selectedChannels, setSelectedChannels] = useState<ChannelItemProps[]>([]);

  useEffect(() => {
    setSelectedChannels([]);
    if (tab === ChannelTabOptions.ALL) {
      getChannelList().then((res) => {
        const { data } = res;
        setSelectedChannels(data);
      }).catch((err) => {
        console.log('all Error', err);
      });
    } else if (tab === ChannelTabOptions.MY) {
      getMyChannelList().then((res) => {
        const { data } = res;
        setSelectedChannels(data);
      }).catch((err) => {
        console.log('my Error', err);
      });
    }
  }, [tab]);

  return selectedChannels;
};

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

const DisplayChannelSearch = (props: {}) => {
  return (
    <div className={styles.channelSearchContainer}>
      <input className={styles.channelSearchInput}></input>
      <button className={styles.channelSearchIconContainer}>
        <Image
          className={styles.channelSearchIcon}
          src="/asset/search.png"
          alt="searchChannel"
          width={30}
          height={30}
        />
      </button>
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
  return (
    <div>
      <div className={styles.channelPanelBox}>
        <h2 className={styles.channelPanelFont}>Channels</h2>
      </div>
      <div className={styles.channelButtonsWrapper}>
        <button
          className={`${styles.unselectedPanelTab} ${
            selectedTab === ChannelTabOptions.ALL ? styles.selectedPanelTab : ""
          }`}
          onClick={() => handleTabClick(ChannelTabOptions.ALL)}
        >
          <h2 className={`${styles.selectPanelFont}`}>ALL</h2>
        </button>
        <button
          className={`${styles.unselectedPanelTab} ${
            selectedTab === ChannelTabOptions.MY ? styles.selectedPanelTab : ""
          }`}
          onClick={() => handleTabClick(ChannelTabOptions.MY)}
        >
          <h2 className={`${styles.selectPanelFont}`}>MY</h2>
        </button>
      </div>
    </div>
  );
};

export default Channel;

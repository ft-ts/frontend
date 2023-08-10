"use client";
import io from "socket.io-client";
import React, { useState, useEffect } from "react";
import { ChannelTabOptions } from "./enum/channelTabOptions.enum";
import Image from "next/image";
import styles from "./channel.module.scss";
import { ChannelItem } from "./channelItem";
import Modal from 'react-modal';
import { ChannelForm } from "./channelForm";
import { ChannelMode } from "./enum/temp.enum";

export default function Channel() {
  const [selectedChannel, setSelectedChannel] = useState<{
    channelId: number;
  } | null>(null); // 선택한 채널 정보를 저장하는 상태

  const handleChannelClick = (channelId: number) => {
    setSelectedChannel({ channelId });
  };

  useEffect(() => { // 선택한 채널 정보가 변경되면 콘솔에 출력
    console.log("Selected Channel:", selectedChannel);
  }, [selectedChannel]);

  return (
    <div>
      <CreateChannel />
      <ChannelPanels />
      <DisplayChannelSearch />
      {/* <ChannelComponent selectedChannel={selectedChannel} /> */}
      <ChannelItem
        title="Channel Title 1"
        members={1}
        mode={ChannelMode.PUBLIC}
        channelId={1}
        onClick={handleChannelClick}
      />
    </div>
  );
}

const CreateChannel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const customStyles = {
    content: {
      width: '400px',
      height: '600px',
      padding: '0px',
      border: '1px solid #ddd',
      borderRadius: '8px',
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
      <button className={styles.createChannelBox} onClick={handleOpenModal}>
        <h2 className={styles.createChannelFont}>Create Channel</h2>
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Create Channel Modal"
        style={customStyles}
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

const ChannelPanels = (props: {}) => {
  const [selectedTab, setSelectedTab] = useState(ChannelTabOptions.ALL);

  const handleTabClick = (tab: ChannelTabOptions) => {
    setSelectedTab(tab);
  };

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

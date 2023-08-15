"use client";

import { io, Socket } from "socket.io-client";
import React, { useState, useEffect } from "react";
import { ChannelTabOptions } from "./enum/channelTabOptions.enum";
import Image from "next/image";
import styles from "./channel.module.scss";
import { ChannelItem } from "./channelItem";
import Modal from "react-modal";
import { ChannelForm } from "./channelForm";
import ChannelItemProps from "./interfaces/channelItemProps";
import { socket } from "../../socketConfig";

export default function Channel({ setChannelId }: { setChannelId: React.Dispatch<React.SetStateAction<number | null>> }) {
  const [selectedTab, setSelectedTab] = useState(ChannelTabOptions.ALL);

  useSocketConnection(socket);

  const channels = useChannelData(socket, selectedTab);

  const handleTabClick = (tab: ChannelTabOptions) => {
    setSelectedTab(tab);
  };

  const handleChannelClick = (channelId: number) => {
    socket.emit("enterChannel", { channelId });
    setChannelId(channelId);
  };

  return (
    <div>
      <CreateChannel socket={socket} />
      <ChannelPanels
        handleTabClick={handleTabClick}
        selectedTab={selectedTab}
      />
      <DisplayChannelSearch />
      <div className={styles.channelContainer}>
          {channels && channels.map((channel) => (
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
    </div>
  );
}

const requestChannelsFromServer = (socket:Socket, tab:ChannelTabOptions) => {
  if (tab === ChannelTabOptions.ALL) {
    socket.emit("getAllChannels");
  } else if (tab === ChannelTabOptions.MY) {
    socket.emit("getMyChannels");
  }
};

const useSocketConnection = (socket: Socket) => {
  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("Connected to socket server");
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);
};

const useChannelData = (socket: Socket, tab: ChannelTabOptions) => {
  const [channels, setChannels] = useState<ChannelItemProps[]>([]);

  useEffect(() => {
    const handleChannels = (data: ChannelItemProps[]) => {
      setChannels(data);
    };
    socket.on(tab === ChannelTabOptions.ALL ? "getAllChannels" : "getMyChannels", handleChannels);
    requestChannelsFromServer(socket, tab);
    return () => {
      socket.off(tab === ChannelTabOptions.ALL ? "getAllChannels" : "getMyChannels", handleChannels);
      socket.off("getAllChannels", requestChannelsFromServer);
      socket.off("getMyChannels", requestChannelsFromServer);
    };
  }, []);

  return channels;
};


const CreateChannel = ({ socket }: { socket: Socket }) => {
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
        <ChannelForm onClose={handleCloseModal} socket={socket} />
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

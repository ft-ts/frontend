"use client";

import { Socket } from "socket.io-client";
import React, { useState, useEffect , Dispatch, SetStateAction} from "react";
import { ChannelTabOptions } from "./enum/channelTabOptions.enum";
import Image from "next/image";
import styles from "./channel.module.scss";
import { ChannelItem } from "./channelItem";
import Modal from "react-modal";
import { ChannelForm } from "./channelForm";
import ChannelItemProps from "./interfaces/channelItemProps";
import { ChannelMode } from "./enum/channel.enum";
import PasswordModal from "./passwordModal";
import UserInterface from "@/app/api/interfaces/user.interface";
import { socket_channel } from "@/app/api/client";

function Channel({setChannelId}: {setChannelId: Dispatch<SetStateAction<number | null>>}) {
  const [selectedTab, setSelectedTab] = useState(ChannelTabOptions.ALL);
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);


  useSocketChannelConnection(socket_channel);
  const channels = useChannelData(socket_channel, selectedTab);
  const handleTabClick = (tab: ChannelTabOptions) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    socket_channel.on('error', ({ message }) => {
      setErrorMessage(message);
      setIsNotificationVisible(true);
      setTimeout(() => {
        setIsNotificationVisible(false);
        setErrorMessage(null);
      }, 1500); // Set the duration in milliseconds
    });
  }, []);

  const handleChannelClick = async (channelId: number) => {
    const channel = channels.find((ch) => ch.id === channelId);
    if (!channel) {
      console.error("Channel not found");
      return;
    };
    enterChannel(channelId, 100002);
  };

  const enterChannel = async (channelId: number, uid: number) => {
    const channel = channels.find((ch) => ch.id === channelId);
    if (!channel) {
      console.error("Channel not found");
      return;
    }
    socket_channel.emit("enterChannel", { channelId, uid });
    socket_channel.on("enterChannel", () => {setChannelId(channelId)});
  }

  return (
    <div>
      <CreateChannel socket={socket_channel} />
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
      {isNotificationVisible && (
      <div className={styles.notification}>
        <p>{errorMessage}</p>
      </div>
      )}
      <PasswordModal
       isOpen={showPasswordModal}
       onRequestClose={() => setShowPasswordModal(false)}
      //  onSubmit={enterProtectedChannel}
      />
    </div>
  );
};

const requestChannelsFromServer = (socket:Socket, tab:ChannelTabOptions) => {
  if (tab === ChannelTabOptions.ALL) {
    socket.emit("getAllChannels");
  } else if (tab === ChannelTabOptions.MY) {
    socket.emit("getMyChannels");
  }
};

const useSocketChannelConnection = (socket: Socket) => {
  useEffect(() => {
    socket.on("updateChannel", () => {
      requestChannelsFromServer(socket, ChannelTabOptions.ALL);
    });
    return () => {
      socket.off("updateChannel");
    };
  }
  , [socket]);
}

const useChannelData = (socket: Socket, tab: ChannelTabOptions) => {
  const [channels, setChannels] = useState<ChannelItemProps[]>([]);

  useEffect(() => {
    const handleChannels = (data: ChannelItemProps[]) => {
      setChannels(data);
    };
    requestChannelsFromServer(socket, tab);
    socket.on(tab === ChannelTabOptions.ALL ? "getAllChannels" : "getMyChannels", handleChannels);
    return () => {
      socket.off(tab === ChannelTabOptions.ALL ? "getAllChannels" : "getMyChannels", handleChannels);
    };
  }, [socket, tab, channels]);

  return channels;
};

const CreateChannel = ({ socket }: { socket: Socket }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const customStyles = {
    content: {
      width: "400px",
      height: "600px",
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

export default Channel;
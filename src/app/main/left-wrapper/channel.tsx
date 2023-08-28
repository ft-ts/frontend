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
import { socket } from "../../socketConfig";
import { ChannelMode } from "./enum/channel.enum";
import PasswordModal from "./passwordModal";

function Channel({setChannelId}: {setChannelId: Dispatch<SetStateAction<number | null>>}) {
  const [selectedTab, setSelectedTab] = useState(ChannelTabOptions.ALL);
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<any>(null);
  
  useSocketConnection(socket);
  const channels = useChannelData(socket, selectedTab);
  const handleTabClick = (tab: ChannelTabOptions) => {
    setSelectedTab(tab);
  };

  socket.on("handleConnection", (user: any) => setUser(user));

  const handleChannelClick = async (channelId: number) => {
    const channel = channels.find((ch) => ch.id === channelId);
    if (!channel) {
      console.error("Channel not found");
      return;
    }

    if (channel.mode === ChannelMode.PROTECTED) {
      setShowPasswordModal(true);
    } else {
      enterChannel(channelId, user.uid);
    }
  };

  const enterChannel = async (channelId: number, uid: number) => {
    setChannelId(channelId);
    try {
      const response = await fetch(`/api/channel/enter?channelId=${channelId}&password=${password}`, {
        method: "GET",
        body: JSON.stringify({ uid, channelId, password }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log("response of enter: ", response);
      if (response.ok) {
        const data = await response.json();
        setChannelId(data.id);
      } else if (response.status === 401) {
        console.error("Incorrect password");
      } else {
        console.error("Failed to enter channel");
      }
    } catch (error) {
      console.error("Error while entering channel:", error);
    } finally {
      setPassword("");
    }
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
      <PasswordModal
       isOpen={showPasswordModal}
       onRequestClose={() => setShowPasswordModal(false)}
       onSubmit={enterChannel}
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

const useSocketConnection = (socket: Socket) => {
  const [channels, setChannels] = useState<ChannelItemProps[]>([]);

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      const handleChannels = (data: ChannelItemProps[]) => {
        setChannels(data);
      };
      socket.emit("getAllChannels");
      socket.on("getAllChannels", handleChannels);
      console.log("Connected to socket server");
      return () => {
        socket.off("getAllChannels")};
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
    requestChannelsFromServer(socket, tab);
    socket.on(tab === ChannelTabOptions.ALL ? "getAllChannels" : "getMyChannels", handleChannels);
    return () => {
      socket.off(tab === ChannelTabOptions.ALL ? "getAllChannels" : "getMyChannels", handleChannels);
    };
  }, [socket, tab]);

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
"use client";

import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { ChannelTabOptions } from "./enum/channelTabOptions.enum";
import Image from "next/image";
import styles from "./channel.module.scss";
import { ChannelItem } from "./channelItem";
import Modal from "react-modal";
import { ChannelForm } from "./channelForm";
import ChannelItemProps from "./interfaces/channelItemProps";
import { ChannelMode } from "./enum/channel.enum";
import PasswordModal from "./passwordModal";
import { socket } from "../components/CheckAuth";
import { useGlobalContext } from "@/app/Context/store";
import { set } from "react-hook-form";
import ChannelProps from "./interfaces/channelProps";

function Channel() {
  const [selectedTab, setSelectedTab] = useState(ChannelTabOptions.ALL);
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const { channelId, setChannelId}: any = useGlobalContext();
  const { channel, setChannel }: any = useGlobalContext();
  const { channelMembers, setChannelMembers }: any = useGlobalContext();
  
  const channels = useChannelData(selectedTab);
  const handleTabClick = (tab: ChannelTabOptions) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    if (channelId === null) {
      return;
    }
    socket.emit("channel/getChannelById", { channelId });
    socket.on("channel/getChannelById", (channel: ChannelProps) => {
      setChannel(channel);
    });
    socket.emit("channel/getChannelMembers", { channelId });
    socket.on("channel/getChannelMembers", (channelMembers: any) => {
    setChannelMembers(channelMembers);
    });
    return () => {
      socket.off("channel/getChannelById");
      socket.off("channel/getChannelMembers");
    };
    // socket.on("channel/error", ( message ) => {
    //   setErrorMessage(message);
    //   setIsNotificationVisible(true);
    //   setTimeout(() => {
    //     setIsNotificationVisible(false);
    //     setErrorMessage(null);
    //   }, 1500); // Set the duration in milliseconds
    // }
    // );
  }, [channelId]);

  const handleChannelClick = async (chId: number) => {
    const channel = channels.find((ch) => ch.id === chId);
    if (!channel) {
      console.error("Channel not found");
      return;
    }
    socket.emit("channel/isChannelMember", { chId });
    socket.on("channel/isChannelMember", (isMember: boolean) => {
      console.log("isMember: ", isMember); //
      if (isMember) {
        setChannelId(chId);
      } 
      else if (channel.mode === ChannelMode.PUBLIC) {
        socket.emit("channel/joinChannel", { chId });
        setChannelId(chId);
        socket.on("channel/channelUpdate", (channelData: ChannelProps) => {
          setChannel(channelData);
        }
        );
      }
      else {
        socket.emit("channel/joinChannel", { chId });
        setShowPasswordModal(true);
        setChannelId(chId);
        socket.on("channel/channelUpdate", (channelData: ChannelProps) => {
          setChannel(channelData);
        }
        );
      }
    });
    return () => {
      socket.off("channel/isChannelMember");
    }
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
}

const requestChannelsFromServer = (tab: ChannelTabOptions) => {
  if (tab === ChannelTabOptions.ALL) {
    socket.emit("channel/getAllChannels");
  } else if (tab === ChannelTabOptions.MY) {
    socket.emit("channel/getMyChannels");
  }
};

const useChannelData = (tab: ChannelTabOptions) => {
  const [channels, setChannels] = useState<ChannelItemProps[]>([]);
  const [selectedChannels, setSelectedChannels] = useState<ChannelItemProps[]>([]);
  const { channel }: any = useGlobalContext();

  useEffect(() => {
    socket.on("channel/channelUpdate", (channel: ChannelItemProps) => {
      setChannels((prevChannels) => [
        ...prevChannels.filter((ch) => ch.id !== channel.id),
        channel,
      ]);
    });
    return () => {
      socket.off("channel/channelUpdate");
    }
  }, [channel]);

  useEffect(() => {
    const handleChannels = (data: ChannelItemProps[]) => {
      setSelectedChannels(data);
    };
    requestChannelsFromServer(tab);
    socket.on(
      tab === ChannelTabOptions.ALL ? "channel/getAllChannels" : "channel/getMyChannels",
      handleChannels
    );
    return () => {
      socket.off(
        tab === ChannelTabOptions.ALL ? "channel/getAllChannels" : "channel/getMyChannels",
        handleChannels
      );
    };
  }, [tab, channels]);

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
        <ChannelForm onClose={handleCloseModal}/>
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

"use client";

import styles from "./chat-wrapper.module.scss";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { ChannelSettingForm } from "../../left-wrapper/channelForm";
import { Socket } from "socket.io-client";
import ChannelProps from "../../left-wrapper/interfaces/channelProps";
import { socket_channel } from "@/app/api/client";

export default function ChatMenu({
  channelId,
}: {
  channelId: number | null;
}) {
  const [channel, setChannel] = useState<ChannelProps | null>(null);

  useEffect(() => {
    if (channelId === null) {
      return;
    }
    socket_channel.emit("getChannelById", { channelId });
    socket_channel.on("getChannelById", (channelData: ChannelProps) => {
      setChannel(channelData);
    });
    return () => {
      socket_channel.off("getChannelById");
    }
  }, [socket_channel, channelId]);

  return (
    <div className={styles.chatMenuBox}>
       {channel !== null && (
      <span>
        <UserlistButton socket={socket_channel} channel={channel}/>
        <h2 className={styles.chatMenuTitle}>{channel.title}</h2>
        <ChatSettingButton socket={socket_channel} channel={channel} />
        <CloseButton socket={socket_channel} channel={channel} />
        <ExitButton socket={socket_channel} channel={channel} />
      </span>
    )}
    </div>
  );
}

const CloseButton = ({
  socket,
  channel,
}: {
  socket: Socket;
  channel: ChannelProps;
}) => {
  const handleCloseChannel = () => {
    socket.emit("closeChannel", { channelId: channel.id });
  };
  return (
    <button className={styles.closeButton} onClick={handleCloseChannel}>
      <Image
        src="/asset/close_button.svg"
        alt="close button"
        width={55}
        height={55}
      ></Image>
    </button>
  );
}

const ExitButton = ({
  socket,
  channel,
}: {
  socket: Socket;
  channel: ChannelProps;
}) => {
  const handleExitChannel = () => {
    socket.emit("exitChannel", { channelId: channel.id });
  };
  return (
    <button className={styles.exitButton} onClick={handleExitChannel}>
      <Image
        src="/asset/exit_button.svg"
        alt="exit button"
        width={55}
        height={55}
      ></Image>
    </button>
  );
}

const ChatSettingButton = ({
  socket,
  channel,
}: {
  socket: Socket;
  channel: ChannelProps;
}) => {
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
      <button className={styles.settingButton} onClick={handleOpenModal}>
        <Image
          src="/asset/setting.svg"
          alt="settingButton"
          width={55}
          height={55}
        />
      </button>
      <Modal
        isOpen={isModalOpen}
        contentLabel="Edit Channel Modal"
        style={customStyles}
        ariaHideApp={false}
        onRequestClose={handleCloseModal}
        shouldCloseOnOverlayClick={false}
      >
        <ChannelSettingForm
          onClose={handleCloseModal}
          socket={socket}
          channel={channel}
        />
      </Modal>
    </div>
  );
};

const UserlistButton = ({
	socket,
	channel,
  }: {
	socket: Socket;
	channel: ChannelProps;
  }) =>  {


  return (
    <button className={styles.userlistButton}>
      <Image
        src="/asset/user_list_button.svg"
        alt="userlist button"
        width={55}
        height={55}
      ></Image>
    </button>
  );
};

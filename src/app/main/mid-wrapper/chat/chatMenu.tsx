"use client";

import styles from "./chat-wrapper.module.scss";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import Modal from "react-modal";
import { ChannelSettingForm } from "../../left-wrapper/channelForm";
import { Socket } from "socket.io-client";
import ChannelProps from "../../left-wrapper/interfaces/channelProps";

export default function ChatMenu({
  socket,
  channelId,
}: {
  socket: Socket;
  channelId: number | null;
}) {
  const [channel, setChannel] = useState<ChannelProps | null>(null);

  socket.emit("getChannelById", channelId);
  socket.on("getChannelById", (channelData: ChannelProps) => {
    setChannel(channelData);
  });
  return (
    <span className={styles.chatMenuBox}>
      {channel !== null && (
        <>
          <UserlistButton socket={socket} channel={channel}/>
          <ChatSettingButton socket={socket} channel={channel} />
        </>
      )}
    </span>
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

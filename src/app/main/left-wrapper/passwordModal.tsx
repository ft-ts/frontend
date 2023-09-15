"use client";

import React, { useContext, useState } from "react";
import Modal from "react-modal";
import styles from "./channelForm.module.scss";
import { useGlobalContext } from "@/app/Context/store";
import { socket } from "../components/CheckAuth";
import ChannelProps from "./interfaces/channelProps";

const PasswordModal = ({ isOpen, onRequestClose, chId }: any) => {
  const { password, setPassword }: any = useGlobalContext();
  const { channelErrorMessage, setChannelErrorMessage }: any = useGlobalContext();
  const { setChannelId, }: any = useGlobalContext();
  const { setChannel }: any = useGlobalContext();
  const { setIsChannelNotificationVisible }: any = useGlobalContext();

  const customStyles = {
    content: {
      width: "500px",
      height: "170px",
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
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePasswordSubmit = () => {
    if (!chId) {
      return;
    }
    socket.emit("channel/joinChannel", { chId, password });
    socket.on("channel/error", (data: {message: string}) => {
        setChannelErrorMessage(data.message);
        setIsChannelNotificationVisible(true);
        setTimeout(() => {
          setIsChannelNotificationVisible(false);
        }, 3000);
    });
    if (!channelErrorMessage) {
      socket.on("channel/channelUpdate", (channelData: ChannelProps) => {
          setChannelId(chId);
          setChannel(channelData);
        });
        onRequestClose();
    }
    return () => {
      socket.off("channel/channelUpdate");
      socket.off("channel/error");
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Password Modal"
      style={customStyles}
      ariaHideApp={false}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={false}
    >
      <ChannelEnterForm
        password={password}
        handlePasswordChange={handlePasswordChange}
        handleSubmit={handlePasswordSubmit}
        onRequestClose={onRequestClose}
      />
    </Modal>
  );
};

const ChannelEnterForm = ({
  password,
  handlePasswordChange,
  handleSubmit,
  onRequestClose,
}: any) => {
  return (
    <div className={styles.channelEnterContainer}>
      <h2 className={styles.h2}>Enter Password</h2>
      <button className={styles.closeButton} onClick={onRequestClose}>
        X
      </button>
      <div className={styles.passwordContainer}>
        <input
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
          className={styles.input}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // Prevent default behavior (form submission)
              handleSubmit();
            }}}
        />
        <button className={styles.submitButton} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default PasswordModal;

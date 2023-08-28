"use client";

import React, { useState } from "react";
import Modal from "react-modal";
import styles from "./channelForm.module.scss";

const PasswordModal = ({ isOpen, onRequestClose, onSubmit }: any) => {
  const [password, setPassword] = useState<string>("");

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

  const handleSubmit = () => {
    onSubmit(password);
    setPassword("");
  };

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
        handleSubmit={handleSubmit}
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
          value={password}
          onChange={handlePasswordChange}
          className={styles.input}
        />
        <button className={styles.submitButton} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default PasswordModal;

import React, { useState } from "react";
import Modal from "react-modal";
import styles from "./channel.module.scss";

const PasswordModal = ({ isOpen, onRequestClose, onSubmit }: any) => {
  const [password, setPassword] = useState<string>("");

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
      style={{
        content: {
          width: "300px",
          height: "200px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "20px",
          margin: "0 auto",
          backgroundColor: "#fff",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
        },
      }}
      ariaHideApp={false}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={false}
    >
      <h3>Enter Password:</h3>
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        className={styles.passwordInput}
      />
      <button onClick={handleSubmit} className={styles.passwordSubmit}>
        Submit
      </button>
    </Modal>
  );
};

export default PasswordModal;

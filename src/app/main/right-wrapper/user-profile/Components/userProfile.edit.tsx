'use client';

import React, { useState, useEffect } from 'react';
import Modal from "react-modal";
import styles from './edit.module.scss';
import { EditForm } from "../editForm";

export default function EditMyProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const customStyles = {
    content: {
      width: "400px",
      height: "600px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "20px",
      backgroundColor: "#444444",
      margin: "150px auto",
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
    <>
      <button className={styles.editButton} onClick={handleOpenModal}>
        <h2 className={styles.editFont}>
          Edit my Profile
        </h2>
      </button>
      <Modal
        isOpen={isModalOpen}
        contentLabel="Create Channel Modal"
        style={customStyles}
        ariaHideApp={false}
        onRequestClose={handleCloseModal}
        shouldCloseOnOverlayClick={false}
      >
        <EditForm onClose={handleCloseModal}/>
      </Modal>
    </>
  );
}
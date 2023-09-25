'use client';

import React, { useState, useEffect } from 'react';
import Modal from "react-modal";
import styles from './edit.module.scss';
import { EditForm } from "../editForm";
import { useGlobalContext } from '@/app/Context/store';
import { useRightWrapperContext } from '../../Context/rightWrapper.store';

export default function EditMyProfile() {
  const { editModalOn, setEditModalOn }: any = useRightWrapperContext();
  const { currentChannelId } : any = useGlobalContext();
  const { activeTab } : any = useGlobalContext();

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

  return (
    <>
      <button className={styles.editButton} onClick={() => setEditModalOn(true)}>
        <h2 className={styles.editFont}>
          Edit my Profile
        </h2>
      </button>
      <Modal
        isOpen={editModalOn}
        contentLabel="Create Channel Modal"
        style={customStyles}
        ariaHideApp={false}
        onRequestClose={() => setEditModalOn(false)}
        shouldCloseOnOverlayClick={false}
      >
        <EditForm onClose={() => setEditModalOn(false)}/>
      </Modal>
    </>
  );
}
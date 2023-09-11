'use client'
import { useRecoilValue } from 'recoil';
import Styles from './user-profile.module.scss'
import Image from "next/image";
import { getMyInfo } from '@/app/api/client';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '@/app/Context/store';
import { UserStatus } from '../../enum/UserStatus.enum';
import { EditForm } from "./editForm" 
import EditFormProps from './editFormProps';
import Modal from "react-modal";


export default function UserProfile() {
  const { myInfo, setMyInfo }: any = useGlobalContext();

  useEffect(() => {
    getMyInfo().then((res) => {
      setMyInfo(res.data);
    });
  }, []);

  useEffect(() => {
  }, [myInfo]);
  
  return (
    <div className={Styles.userProfile}>
      <div className={Styles.userInfoWrapper}>
        <Image
          className={Styles?.avatar}
          src={myInfo.avatar} // 이미지 파일의 경로
          alt="My Image"
          width={200} // 이미지 가로 크기
          height={200} // 이미지 세로 크기
        />
        <div className={`${Styles.status} ${getStatusColor(myInfo.status as UserStatus)}`}>{myInfo.status}</div>
        <div className={Styles.username}>{myInfo.name}</div>
        <div className={Styles.stats}>
          <ul>
            <li><span>WIN: {myInfo.ladder_wins}</span></li>
            <li><span>LOSE: {myInfo.ladder_losses}</span></li>
            <li><span>LADDER: {myInfo.rating}</span></li>
          </ul>
        </div>
      </div>
      {/* <button className={Styles.editButton}>EDIT MY INFO</button> */}
      <EditMyProfile />
    </div>
  )
}

const EditMyProfile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const customStyles = {
      content: {
        width: "800px",
        height: "1000px",
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
        <button className={Styles.editButton} onClick={handleOpenModal}>
            Edit my Profile
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
      </div>
    );
  };

function getStatusColor(status: UserStatus) {
  switch (status) {
    case UserStatus.ONLINE:
      return Styles.online;
    case UserStatus.OFFLINE:
      return Styles.offline;
    case UserStatus.IN_GAME:
      return Styles.inGame;
  }
}

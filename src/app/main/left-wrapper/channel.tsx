"use client";

import { io, Socket } from "socket.io-client";
import React, { useState, useEffect } from "react";
import { ChannelTabOptions } from "./enum/channelTabOptions.enum";
import Image from "next/image";
import styles from "./channel.module.scss";
import { ChannelItem } from "./channelItem";
import Modal from "react-modal";
import { ChannelForm } from "./channelForm";
import ChannelItemProps from "./interfaces/channelItemProps";

const BACKEND_URL = "http://localhost:10000/channels"; // 백엔드 소켓 서버 URL

export default function Channel() {
  const [selectedTab, setSelectedTab] = useState(ChannelTabOptions.ALL); // 선택한 탭 상태 추가
  const [selectedChannel, setSelectedChannel] = useState<{
    channelId: number;
  } | null>(null);
  const [channels, setChannels] = useState<ChannelItemProps[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // 소켓 연결 생성
    const newSocket = io(BACKEND_URL);
    setSocket(newSocket);

    // 컴포넌트 언마운트 시 소켓 연결 종료
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (socket) {
      // 소켓 연결 및 이벤트 리스너 설정
      socket.on("connect", () => {
        console.log("Connected to socket server");
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from socket server");
      });

      socket.on("getAllChannels", (allChannels) => {
        setChannels(allChannels);
      });

      socket.on("getMyChannels", (myChannels) => {
        setChannels(myChannels);
      });

      return () => {
        socket.off("connect");
        socket.off("disconnect");
        socket.off("getAllChannels");
        socket.off("getMyChannels");
        // 다른 이벤트 리스너 해제 등
      };
    }
  }, [socket]);

  const handleTabClick = (tab: ChannelTabOptions) => {
    setSelectedTab(tab);
    if (socket && tab === ChannelTabOptions.ALL) {
      socket.emit("getAllChannels"); // ALL 탭 선택 시 모든 채널 가져오도록 서버에 요청
    } else if (socket && tab === ChannelTabOptions.MY) {
      socket.emit("getMyChannels"); // MY 탭 선택 시 내 채널 가져오도록 서버에 요청
    }
  };

  useEffect(() => {
    // 선택한 채널 정보가 변경되면 콘솔에 출력
    console.log("Selected Channel:", selectedChannel);
  }, [selectedChannel]);

  const handleChannelClick = (channelId: number) => {
    setSelectedChannel({ channelId });
  };

  return (
    <div>
          <CreateChannel />
          <ChannelPanels
            handleTabClick={handleTabClick}
            selectedTab={selectedTab}
          />
          <DisplayChannelSearch />
        <div className={styles.channelContainer}>
        <div className={styles.channelList}>
          {channels.map((channel) => (
            <ChannelItem
              title={channel.title}
              members={channel.members}
              mode={channel.mode}
              channelId={channel.channelId}
              onClick={handleChannelClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const CreateChannel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const customStyles = {
    content: {
      width: "400px",
      height: "600px",
      padding: "0px",
      border: "1px solid #ddd",
      borderRadius: "8px",
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
        onRequestClose={handleCloseModal}
        contentLabel="Create Channel Modal"
        style={customStyles}
        shouldCloseOnOverlayClick={false}
      >
        <ChannelForm onClose={handleCloseModal} />
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

// const ChannelPanels = (props: {}) => {
//   const [selectedTab, setSelectedTab] = useState(ChannelTabOptions.ALL);

//   const handleTabClick = (tab: ChannelTabOptions) => {
//     setSelectedTab(tab);
//   };

//   return (
//     <div>
//       <div className={styles.channelPanelBox}>
//         <h2 className={styles.channelPanelFont}>Channels</h2>
//       </div>
//       <div className={styles.channelButtonsWrapper}>
//         <button
//           className={`${styles.unselectedPanelTab} ${
//             selectedTab === ChannelTabOptions.ALL ? styles.selectedPanelTab : ""
//           }`}
//           onClick={() => handleTabClick(ChannelTabOptions.ALL)}
//         >
//           <h2 className={`${styles.selectPanelFont}`}>ALL</h2>
//         </button>
//         <button
//           className={`${styles.unselectedPanelTab} ${
//             selectedTab === ChannelTabOptions.MY ? styles.selectedPanelTab : ""
//           }`}
//           onClick={() => handleTabClick(ChannelTabOptions.MY)}
//         >
//           <h2 className={`${styles.selectPanelFont}`}>MY</h2>
//         </button>
//       </div>
//     </div>
//   );
// };

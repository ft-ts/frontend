"use client"

import { useState, useEffect } from 'react';
import styles from "./channel.module.scss";
import io from 'socket.io-client';
import { ChannelTabOptions } from './enum/channelTabOptions.enum';
import Image from "next/image"
import ChannelItem from './channelItem';

import React from 'react';

// import { ChannelMode } from '../../../../../backend/src/channel/enum/channelMode.enum';

enum ChannelMode {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  PROTECTED = 'PROTECTED',
}

export default function leftWrapper() {
  return (
    <div className={styles.leftWrapper}>
      <CreateChannel />
      <ChannelPanels />
      <DisplayChannelSearch />
        {/* <ChannelComponent selectedTab={selectedTab} /> */}
        <ChannelItem title="Channel Title 1" members={1} mode={ChannelMode.PUBLIC} />
      <div className={styles.dmPanelBox}>
        <h2 className={styles.channelPanelFont}>Direct Messages</h2>
      </div>
      <div className={styles.dmList}>
        
      </div>
    </div>
  );
}

const CreateChannel = (props: {}) => {
  return (
    <button className={styles.createChannelBox}>
      <h2 className={styles.createChannelFont}>Create Channel</h2>
    </button>
  )
}

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
  )
}

const ChannelPanels = (props: {}) => {
  const [selectedTab, setSelectedTab] = useState(ChannelTabOptions.ALL);

  const handleTabClick = (tab: ChannelTabOptions) => {
    setSelectedTab(tab);
  };

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
}


// const BACKEND_URL = 'http://localhost:3001/channels';
// const socket = io(BACKEND_URL);

// const ChannelComponent = ({ selectedTab }: { selectedTab: ChannelTabOptions }) => {
//     const [channels, setChannels] = useState([]);
  
//     useEffect(() => {
//     //   const socket = io(BACKEND_URL);
//      console.log('test');
    
//       socket.emit('getAllChannels');
  
//       socket.on('getAllChannels', (data) => {
//         setChannels(data);
//       });
  
//       return () => {
//         socket.disconnect();
//       };
//     }, []);
  
//     return (
//       <div>
//         <ul>
//           {channels
//             .filter((channel) => selectedTab === ChannelTabOptions.ALL)
//             .map((channel) => (
//               <li>{channel}</li>
//             ))}
//         </ul>
//       </div>
//     );
//   };
// }

"use client"

import { useState, useEffect } from 'react';
import styles from "./channel.module.scss";
import io from 'socket.io-client';
import { ChannelTabOptions } from './enum/channelTabOptions.enum';

export default function ChannelWrapper() {
  const [selectedTab, setSelectedTab] = useState(ChannelTabOptions.ALL);

  const handleTabClick = (tab: ChannelTabOptions) => {
    setSelectedTab(tab);
  };

  return (
    <div className={styles.leftWrapper}>
      <button className={styles.createChannelBox}>
        <h2 className={styles.createChannelFont}>Create Channel</h2>
      </button>
      <div className={styles.channelPanelBox}>
        <h2 className={styles.channelPanelFont}>Channels</h2>
      </div>
      <div className={styles.channelButtonsWrapper}>
        <button
          className={`${styles.unselectedPanelTab} ${selectedTab === ChannelTabOptions.ALL ? styles.selectedPanelTab : ''}`}
          onClick={() => handleTabClick(ChannelTabOptions.ALL)}
        >
          <h2 className={`${styles.selectPanelFont}`}>
            ALL
          </h2>

        </button>
        <button
          className={`${styles.unselectedPanelTab} ${selectedTab === ChannelTabOptions.MY ? styles.selectedPanelTab : ''}`}
          onClick={() => handleTabClick(ChannelTabOptions.MY)}
        >
          <h2 className={`${styles.selectPanelFont}`}>
            MY
          </h2>
        </button>
      </div>
        {/* <ChannelComponent selectedTab={selectedTab} /> */}
    </div>
  );
}

// const BACKEND_URL = 'http://localhost:3001/channels';
// const socket = io(BACKEND_URL);
// // Rest of the imports and constants

// const ChannelComponent = ({ selectedTab }: { selectedTab: ChannelTabOptions }) => {
//     const [channels, setChannels] = useState([]);
  
//     // useEffect(() => {
//     // //   const socket = io(BACKEND_URL);
//     //  console.log('test');
    
//     //   socket.emit('getAllChannels');
  
//     //   socket.on('getAllChannels', (data) => {
//     //     setChannels(data);
//     //   });
  
//     //   return () => {
//     //     socket.disconnect();
//     //   };
//     // }, []);
  
// //     return (
// //       <div>
// //         <ul>
// //           {channels
// //             .filter((channel) => selectedTab === ChannelTabOptions.ALL)
// //             .map((channel) => (
// //               <li>{channel}</li>
// //             ))}
// //         </ul>
// //       </div>
// //     );
// //   };
// }

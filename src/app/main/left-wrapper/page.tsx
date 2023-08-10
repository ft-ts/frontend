"use client"

import styles from "./channel.module.scss";
import React from 'react';
import Channels from './channel';
import Dms from './dm';
// import { ChannelMode } from '../../../../../backend/src/channel/enum/channelMode.enum';


export default function leftWrapper() {
  return (
    <div className={styles.leftWrapper}>
      <Channels/>
      <Dms/>
      <div className={styles.dmList}>
        
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

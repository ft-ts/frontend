import React, { useState, useEffect } from "react";
import styles from "./userList.module.scss"
import { UserListProps, UserListContainerProps, gameStateProps } from "../userType";
import Image from "next/image";

const users: UserListProps[] = [
    { userProfilePicture: "/asset/profile_dumy.png", nickName: 'John', gameState: false, online: true },
    { userProfilePicture: "/asset/profile_dumy.png", nickName: 'Jane', gameState: true, online: true },
  ];

export default function DisplayUserList(props: UserListProps){
    return (
        <div className={styles.userListBackground}>
            <DisplayUserFriendList />
            <DisplayUserChannelList />
            <DisplayUserAllList />
            <DisplayUserListSearch />
            {/* <ScrollComponent /> */}
            <UserListBox user={users[0]}/>
        </div>
    )
}

const DisplayUserFriendList = (props: {}) => {
    return (
        <button className={styles.listButton}>
            <h3 className={styles.listButtonText}>Friend</h3>
        </button>
    )
}

const DisplayUserChannelList = (props: {}) => {
    return (
        <button className={styles.listButton}>
            <h3 className={styles.listButtonText}>Channel</h3>
        </button>
    )
}

const DisplayUserAllList = (props: {}) => {
    return (
        <button className={styles.listButtonAll}>
            <h3 className={styles.listButtonText}>All</h3>
        </button>
    )
}

const DisplayUserListSearch = (props: {}) => {
    return (
        <button className={styles.listSearchButton}>
            <Image src="/asset/search.png"
            className={styles.listSearchVector} 
            alt="searchPicture"
            width={32}
            height={32} />
        </button>
    )
}
// scorllbar have to be made completely
function ScrollComponent()  {
    return (
      <div className="scrollContainer">
        <div style={{ height: '400px' }}></div>
      </div>
    );
  }

//   const UserListContainer = (props: UserListContainerProps) => {
//     return (
//       <div>
//         {props.users.map((user, index) => (
//           <UserListBox key={index} {...user} />
//         ))}
//       </div>
//     );
//   };

  interface UserListBoxProps{
    user: UserListProps;
  }

  const DisplayUserGameState = (props: gameStateProps) => {
    
    const [status, setStatus] = useState("");
    const [style, setStyle] = useState({});

    useEffect(() => {
        if (props.online){
            console.log(props.online);
            if (props.gameState){
                setStatus("In-Game");
                setStyle(styles.GameState);
            }else {
                setStatus("online");
                setStyle(styles.onlineState);
            }
        }else{
            setStatus("offline");
            setStyle(styles.offlineState)
        }
    }, [props.gameState, props.online]);
    return (
        <div className={style}>
            <h3>{status}</h3>
        </div>
    )
}

  const UserListBox = (props: UserListBoxProps) => {
    return (
        <button className={styles.userListRectangle}>
             <img src={props.user.userProfilePicture} alt="profile" style={{ width: '50px', height: '50px', marginLeft: "10px" }} />
             <div className={styles.userProfileName}>
                {props.user.nickName}
             </div>
             <div>
                <DisplayUserGameState 
                    gameState={props.user.gameState} 
                    online={props.user.online}
                     />
             </div>
        </button>
    )
  }
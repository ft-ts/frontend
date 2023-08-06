import React, { useState, useEffect } from "react";
import styles from "./userList.module.scss"
import { UserListProps, UserListContainerProps, gameStateProps } from "../userType";
import Image from "next/image";
import DisplayUserlistSetting from "./userListSetting"

const users: UserListProps[] = [
    { userProfilePicture: "/asset/profile_dumy.png", nickName: 'John', gameState: false, online: true },
    { userProfilePicture: "/asset/profile_dumy.png", nickName: 'Jane', gameState: true, online: true },
  ];

export default function DisplayUserList(props: {}){
    return (
        <div className={styles.userListBackground}>
            <DisplayUserFriendList />
            <SelectUserList />
            <DisplayUserListSearch />
            <UserListContainer users={users}/>
            {/* <ScrollComponent /> */}
            {/* <UserListBox user={users[0]}/> */}
        </div>
    )
}

const SelectUserList = (props: {}) => {
    return (
        <div>
            <DisplayUserFriendList />
            <DisplayUserChannelList />
            <DisplayUserAllList />
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
        <button className={styles.listButton} style={{left: "211px"}}>
            <h3 className={styles.listButtonText}>Channel</h3>
        </button>
    )
}

const DisplayUserAllList = (props: {}) => {
    return (
        <button className={styles.listButtonAll} style={{left: "422px"}}>
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

const UserListContainer = (props: UserListContainerProps) => {
    return (
      <div>
        {props.users.map((user, index) => (
          <UserListBox key={index} user={user} top={`${207 + index * 96}px`} />
        ))}
      </div>
    );
  };
  
  
  

  interface UserListBoxProps {
    user: UserListProps;
    top: string;
  }
  

  const DisplayUserGameState = (props: gameStateProps) => {
    
    const [status, setStatus] = useState("");
    const [style, setStyle] = useState("");

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
  const [showSetting, setShowSetting] = useState(false); // Initialize the state variable

  const handleClick = () => {
    setShowSetting(true); // Set the state variable to true when the button is clicked
  };

  return (
    <div>
      <button onClick={handleClick} className={styles.userListRectangle} style={{ top: props.top }}>
        <img src={props.user.userProfilePicture} alt="profile" style={{ width: '75px', height: '75px', marginLeft: "10px" }} />
        <div className={styles.userProfileName}>
          {props.user.nickName}
          <DisplayUserGameState 
            gameState={props.user.gameState} 
            online={props.user.online}
          />
        </div>
      </button>
      {showSetting && <DisplayUserlistSetting />} {/* Conditionally render the component */}
    </div>
  );
};

  

  

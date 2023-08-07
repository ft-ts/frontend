import React from "react";
import styles from "./userListSetting.module.scss"
import Image from "next/image";
import { UserProps, UserInfoContainer } from "../userType"

const DisplayUserlistSetting = (props: {userProps: UserInfoContainer,  onBack: () => void }) => {

    return (
        <div className={styles.userListSettingBackground}>
            <DisplayName  user={props.userProps.OneUser}/>
            <DisplayProfile />
            <DisplayInvite />
            <DisplayAskMatch />
            <DisplayAskBlocking />
            <DisplayAddFriend />
            <BackToUserList onBack={props.onBack} />
        </div>
    )
}


const DisplayName = (props: { user: UserProps }) => {
    return (
      <h2 className={styles.DisplayFont}>{props.user.name}</h2>
    )
  }

const DisplayProfile = (props: {}) => {
    return (
        <button className={styles.showSetting} style={{top: 80}}>
            <h2 style={{fontSize: 42, fontFamily: 'ArcadeClassic'}}>Profile</h2>
        </button>
    )
}

const DisplayInvite = (props: {}) => {
    return (
        <button className={styles.showSetting} style={{top: 160}}>
            <h2 style={{fontSize: 42, fontFamily: 'ArcadeClassic'}}>Invite</h2>
        </button>
    )
}

const DisplayAskMatch = (props: {}) => {
    return (
        <button className={styles.showSetting} style={{top: 240}}>
            <h2 style={{fontSize: 42, fontFamily: 'ArcadeClassic'}}>Ask Match</h2>
        </button>
    )
}

const DisplayAskBlocking = (props: {}) => {
    return (
        <button className={styles.showSetting} style={{top: 320}}>
            <h2 style={{fontSize: 36, fontFamily: 'ArcadeClassic'}}>Block this user</h2>
        </button>
    )
}

const DisplayAddFriend = (props: {}) => {
    return (
        <button className={styles.showSetting} style={{top: 400}}>
            <h2 style={{fontSize: 42, fontFamily: 'ArcadeClassic'}}>Add Friend</h2>
        </button>
    )
}

const BackToUserList = (props: { onBack: () => void }) => {
    return (
      <button className={styles.backdoorButton} onClick={props.onBack}>
          <Image src="/asset/back_door.svg" 
              alt="뒤로가기"
              width={52}
              height={52} />
      </button>
    );
  };
  
  
  
  
  
  



export default DisplayUserlistSetting;
export {};
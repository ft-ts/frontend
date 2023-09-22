"use client";

import React, {useState} from "react";
import { ChannelUser } from "../../../mid-wrapper/chat/interfaces/channelUser.interface"
import styles from './userList.module.scss';
import Image from "next/image";
import { User } from "@/app/main/interface/User.interface";
import { ChannelRole } from "@/app/main/mid-wrapper/chat/enum/channelRole.enum";
import SetBanType from "./userList.channel.modal";
import Modal from "react-modal";
import { socket } from "@/app/main/components/CheckAuth";
import { useGlobalContext } from "@/app/Context/store";
import { postGrantAdmin, postRevokeAdmin, postMuteUser } from "@/app/axios/client";

const owner = "/asset/crown.png";
const admin = "/asset/admin.png";
const person = "/asset/person.png";
const mute = "/asset/muteIcon.png";
const ban = "/asset/banIcon.png";
const revoke = "/asset/revoke.png"

export default function UserListChannel(
  {
    item,
    myRole,
  }:{
    item: ChannelUser
    myRole: ChannelRole
  })
  {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ modalPostion, setModalPosition ] = useState({top: 0, left: 0});
    const { setCurrentUser } : any = useGlobalContext();
    const { myInfo } : any = useGlobalContext();
    const { currentChannel } : any = useGlobalContext();

    const customStyles = {
      content: {
        width: "250px",
        height: "130px",
        border: "2px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#444444",
        top: modalPostion.top,
        left: modalPostion.left - 250,
        alignItems: "center",

      },
      overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
      },
    };

    const handleClick = () => {
      console.log(item.role);
      setCurrentUser(item.user);
    }

    const handleSetAdmin = () => {
      const targetUserUid : number = item.user.uid;
      const channelId : number = currentChannel.id;
      /*
        Post Set Admin
        postGrantAdmin(channelId, targetUserUid).then((res) => {
          console.log(res.data);
          socket.emit();
          Update List
        }.catch((err) => {
          console.log(err);
        });
      */
    }

    const handleRevokeAdmin = () => {
      console.log('RevokeAdmin');
      const targetUserUid : number = item.user.uid;
      const channelID : number = currentChannel.id;
      /*
        Post Revoke Admin
        postRevokeAdmin(channelId, targetUserUid).then((res) => {
          console.log(res.data);
          socket.emit();
          Update List
        }.catch((err) => {
          console.log(err);
        });
      */
    }

    const handleMute = () => {
      console.log('Mute');
      const targetUserUid : number = item.user.uid;
      const channelID : number = currentChannel.id;
      /*
        Post Mute
        postMuteUser(targetUserUid, channelID).then((res) => {
          console.log(res.data);
        }.catch((err) => {
          console.log(err);
        });
      */
    }
    
    const handleBan = (e: any) => {
      const { top, left } = e.target.getBoundingClientRect();
      console.log('Ban');
      setIsModalOpen(true);
      setModalPosition({top: top, left: left});
    }

    const handleCloseModal = () => {
      setIsModalOpen(false);
      setModalPosition({top: 0, left: 0});
    };

  return (
    <div className={styles.userListContainer}>
      <button onClick={handleClick} className={`${styles.userListBox} ${styles.channelWidth}`}>
        <div className={styles.userChatRoleBox}>
        <Image src={userRole(item.role)} width={30} height={30} alt={item.user.name}></Image>
        </div>
        <div className={styles.userAvatarBox}>
          <Image src={item.user.avatar} width={80} height={80} alt={item.user.name} className={styles.userAvatar}></Image>
        </div>
        <div className={styles.userNameBox}>
          <h2 className={styles.userName}>{item.user.name}</h2>
        </div>
      </button>
      {(!checkMe(myInfo, item.user) && checkAdmin(myRole) && !checkAdmin(item.role)) && <div className={styles.userListButtonContainer}>
        {checkOwner(myRole) && <button className={styles.buttonBox}>
          <Image src={checkAdmin(item.role) ? revoke : admin} width={30} height={30} alt="admin" onClick={handleSetAdmin}></Image>
        </button>}
        <button className={styles.buttonBox}>
          <Image src={mute} width={40} height={40} alt="kick" onClick={handleMute}></Image>
        </button>
        <button className={styles.buttonBox}>
          {<Image src={ban} width={40} height={40} alt="ban" onClick={handleBan}></Image>}
        </button>
        <Modal 
          isOpen={isModalOpen}
          contentLabel="Ban User Modal"
          ariaHideApp={false}
          style={customStyles}
          shouldCloseOnOverlayClick={false}
        >
          <SetBanType handleCloseModal={handleCloseModal} channelId={currentChannel.id} userUid={item.user.uid}/>
        </Modal> 
      </div>}
    </div>
  )
}

const userRole = (role: ChannelRole) => {
  if (role === ChannelRole.OWNER) {
    return owner;
  } else if (role === ChannelRole.ADMIN) {
    return admin;
  }
  return person;
}

const checkOwner = (role: ChannelRole) : boolean => {
  if (role === ChannelRole.OWNER) {
    return true;
  }
  return false;
}

const checkAdmin = (role: ChannelRole) : boolean => {
  if (role === ChannelRole.ADMIN || role === ChannelRole.OWNER) {
    return true;
  }
  return false;
}

const checkMe = (myInfo: User, user: User) : boolean => {
  if (myInfo.uid === user.uid) {
    return true;
  }
  return false;
}
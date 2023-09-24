"use client";

import React, {useState} from "react";
import { ChannelUser } from "../../../mid-wrapper/chat/interfaces/channelUser.interface"
import styles from './userList.module.scss';
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
    const { setIsNotificationVisible }: any = useGlobalContext();
    const { setErrorMessage }: any = useGlobalContext();

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
      setCurrentUser(item.user);
    }

    const handleSetAdmin = () => {
      const targetUserUid : number = item.user.uid;
      const channelId : number = currentChannel.id;
        postGrantAdmin(channelId, targetUserUid).then((res) => {
          if (res.data && res.data.success) {
            socket.emit('channel/innerUpdate', {channelId: channelId});
            socket.emit('channel/sendMessage', {channelId: channelId, content: `${res.data.message}`, isNotice: true})
          } else {
            setErrorMessage(res.data.message);
            setIsNotificationVisible(true);
            setTimeout(() => {
              setIsNotificationVisible(false);
            }, 3000);
          }
        }
        ).catch((err) => {
          setErrorMessage(err);
          setIsNotificationVisible(true);
          setTimeout(() => {
            setIsNotificationVisible(false);
          }, 3000);
          console.log(err);
        });
    }

    const handleRevokeAdmin = () => {
      const targetUserUid : number = item.user.uid;
      const channelId : number = currentChannel.id;
        postRevokeAdmin(channelId, targetUserUid).then((res) => {
          if (res.data && res.data.success) {
            socket.emit('channel/innerUpdate', {channelId: channelId});
            socket.emit('channel/sendMessage', {channelId: channelId, content: `${res.data.message}`, isNotice: true})
          } else {
            setErrorMessage(res.data.message);
            setIsNotificationVisible(true);
            setTimeout(() => {
              setIsNotificationVisible(false);
            }, 3000);
          }
        }).catch((err) => {
          setErrorMessage(err);
          setIsNotificationVisible(true);
          setTimeout(() => {
            setIsNotificationVisible(false);
          }, 3000);
        });
    }

    const handleMute = () => {
      const targetUserUid : number = item.user.uid;
      const channelId : number = currentChannel.id;
        postMuteUser(channelId, targetUserUid).then((res) => {
          if (res.data && res.data.success) {
          socket.emit('channel/sendMessage', {channelId: channelId, content: `${res.data.message}`, isNotice: true})
          } else {
            setErrorMessage(res.data.message);
            setIsNotificationVisible(true);
            setTimeout(() => {
              setIsNotificationVisible(false);
            }, 3000);
          }
        }).catch((err) => {
          setErrorMessage(err);
          setIsNotificationVisible(true);
          setTimeout(() => {
            setIsNotificationVisible(false);
          }, 3000);
        });
    }
    
    const handleBan = (e: any) => {
      const { top, left } = e.target.getBoundingClientRect();
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
        <img src={userRole(item.role)} width={30} height={30} alt={item.user.name}/>
        </div>
        <div className={styles.userAvatarBox}>
          <img src={item.user.avatar} width={80} height={80} alt={item.user.name} className={styles.userAvatar}/>
        </div>
        <div className={styles.userNameBox}>
          <h2 className={styles.userName}>{item.user.name}</h2>
        </div>
      </button>
      {(!checkMe(myInfo, item.user) && checkAdmin(myRole) && !checkOwner(item.role)) && <div className={styles.userListButtonContainer}>
        {checkOwner(myRole) && <button className={styles.buttonBox}>

          {checkAdmin(item.role) ? <img src={revoke} width={30} height={30} alt="revoke" onClick={handleRevokeAdmin} /> : <img src={admin} width={30} height={30} alt="admin" onClick={handleSetAdmin} />}
        </button>}
        <button className={styles.buttonBox}>
          <img src={mute} width={40} height={40} alt="mute" onClick={handleMute} />
        </button>
        <button className={styles.buttonBox}>
          {<img src={ban} width={40} height={40} alt="ban" onClick={handleBan}/>}
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
"use client";

import React, { useEffect, useState } from "react";
import styles from "./button.module.scss";
import { User } from "@/app/main/interface/User.interface";
import { socket } from "@/app/main/components/CheckAuth";
import { postFriend, postBlockUser } from "@/app/axios/client";
import { useGlobalContext, TabOptions } from "@/app/Context/store";
import { useRightWrapperContext } from "../../Context/rightWrapper.store";
import { getUserByUid } from "@/app/axios/client";
import { DmListProps } from "@/app/main/left-wrapper/interfaces/dmItemProps";
import { ChannelRole } from "@/app/main/mid-wrapper/chat/enum/channelRole.enum";
import { 
  postGrantAdmin,
  postRevokeAdmin,
  postMuteUser,
  deleteFriend,
  postInviteUser,
  deleteBlockUser,
  postBanUser,
  postKickUser
} from "@/app/axios/client";

const block = "/asset/block.png";
const unblock = "/asset/unblock.png";
const addFriend = "/asset/plus.png";
const minus = "/asset/minus.png";
const inviteMatch = "/asset/pongIcon.png";
const dm = "/asset/msgIcon.png";
const invite = "/asset/inviteIcon.png";

const mute = "/asset/muteIcon.png";
const ban = "/asset/kick.png";
const kick = "/asset/banIcon.png";
const revoke = "/asset/revoke.png"
const grant = "/asset/admin.png";

export default function ProfileButton({ user }: { user: User }) {
  const { dmList, setDmList }: any = useGlobalContext();
  const { currentChannelId, setCurrentChannelId} : any = useGlobalContext();
  const { currentDmId, setCurrentDmId }: any = useGlobalContext();
  const { myRole }: any = useGlobalContext();
  const { activeTab }: any = useGlobalContext();
  const { currentUserRole, setCurrentUserRole }: any = useGlobalContext();
  const { currentChannel }: any = useGlobalContext();
  const { friendList } : any = useRightWrapperContext();
  const { blockList, setBlockList }: any = useGlobalContext();
  const { setIsNotificationVisible }: any = useGlobalContext();
  const { setErrorMessage }: any = useGlobalContext();
  const { setCurrentUser }: any = useGlobalContext();
  const { myInfo }: any = useGlobalContext();
  const { channelFlag, setChannelFlag }: any = useGlobalContext();

  const checkFriend = (uid: number) => {
    return friendList.some((friend: User) => friend.uid === uid);
  }

  const handleAddFriend = () => {
    postFriend(user.uid).then((res) => {
      socket.emit('update/friends');
    }).catch((err) => {
      setErrorMessage('Failed to add friend.');
      setIsNotificationVisible(true);
      setTimeout(() => {
        setIsNotificationVisible(false);
        setErrorMessage('');
      }, 2000);
    });
  };

  const checkBlock = (uid: number) => {
    if (blockList.some((blockUser: number) => blockUser === uid)) {
      return true;
    }
    return false;
  }

  const handleBlock = () => {
    postBlockUser(user.uid).then((res) => {
      const { data }: { data: number } = res;
      setBlockList((prevBlockList: number[]) => [...prevBlockList, data]);
    }).catch((err) => {
      setErrorMessage('Failed to block user.');
      setIsNotificationVisible(true);
      setTimeout(() => {
        setIsNotificationVisible(false);
        setErrorMessage('');
      }, 2000);
    });
  };

  const handleUnblock = () => {
    deleteBlockUser(user.uid).then((res) => {
      const { data }: { data: number } = res;
      setBlockList((prevBlockList: number[]) =>
      prevBlockList.filter((blockUser: number) => blockUser !== data)
    );
    }).catch((err) => {
      setErrorMessage('Failed to unblock user.');
      setIsNotificationVisible(true);
      setTimeout(() => {
        setIsNotificationVisible(false);
        setErrorMessage('');
      }, 2000);
    });
  }

  const handleInviteMatch = () => {
    socket.emit("pong/match/invite", { uid: user.uid });
  };

  const handleDM = async () => {
    if (currentDmId === user.uid) {
      return;
    } 
    setCurrentChannelId(null);
    setCurrentDmId(user.uid);
    if (dmList.some((dmItem: DmListProps) => dmItem.user_uid === user.uid)) {
      return;
    }
    const dmTargetUser = await getUserByUid(user.uid);
    const dmItemProps: DmListProps = {
      user_uid: dmTargetUser.data.uid,
      user_name: dmTargetUser.data.name,
      user_avatar: dmTargetUser.data.avatar,
      unread_count: 0,
    };
    setDmList((prevDmItemProps: DmListProps[] | null) => [...(prevDmItemProps || []), dmItemProps]);
  };

  const handleDeleteFriend = () => {
    deleteFriend(user.uid).then((res) => {
      socket.emit('update/friends');
    }).catch((err) => {
      setErrorMessage('Failed to delete friend.');
      setIsNotificationVisible(true);
      setTimeout(() => {
        setIsNotificationVisible(false);
        setErrorMessage('');
      }, 2000);
    });
  };

  const handleInviteChat = () => {
    if (!currentChannelId) {
      setErrorMessage('You are not in any channel.');
      setIsNotificationVisible(true);
      setTimeout(() => {
        setIsNotificationVisible(false);
        setErrorMessage('');
      }, 2000);
      return;
    } else{
      postInviteUser(currentChannelId, user.uid).then((res) => {
        socket.emit('channel/joinUpdate', { channelId: currentChannelId });
        socket.emit('channel/sendMessage', {
          channelId: currentChannelId,
          content: `${res.data} has been invited to this channel.`,
          isNotice: true,
        });
      }).catch((err) => {
        setErrorMessage(err.response.data.message);
        setIsNotificationVisible(true);
        setTimeout(() => {
          setIsNotificationVisible(false);
          setErrorMessage('');
        }, 2000);
      });
    }
  };

  const handleSetAdmin = () => {
    const targetUserUid : number = user.uid;
    const channelId : number = currentChannel.id;
      postGrantAdmin(channelId, targetUserUid).then((res) => {
        setCurrentUserRole(ChannelRole.ADMIN);
        socket.emit('channel/leaveUpdate', {channelId: channelId, targetUid: targetUserUid, granted: ChannelRole.ADMIN});
      }
      ).catch((err) => {
        setErrorMessage('Failed to set admin.');
        setIsNotificationVisible(true);
        setTimeout(() => {
          setIsNotificationVisible(false);
          setErrorMessage('');
        }, 2000);
      });
  }

  const handleRevokeAdmin = () => {
    const targetUserUid : number = user.uid;
    const channelId : number = currentChannel.id;
      postRevokeAdmin(channelId, targetUserUid).then((res) => {
        setCurrentUserRole(ChannelRole.NORMAL);
        socket.emit('channel/leaveUpdate', {channelId: channelId, targetUid: targetUserUid, granted: ChannelRole.NORMAL});
      }).catch((err) => {
        setErrorMessage('Failed to revoke admin.');
        setIsNotificationVisible(true);
        setTimeout(() => {
          setIsNotificationVisible(false);
          setErrorMessage('');
        }, 2000);
      });
  }

  const handleMute = () => {
    const targetUserUid : number = user.uid;
    const channelId : number = currentChannel.id;
      postMuteUser(channelId, targetUserUid).then((res) => {
      }).catch((err) => {
        setErrorMessage('Failed to mute user.');
        setIsNotificationVisible(true);
        setTimeout(() => {
          setIsNotificationVisible(false);
          setErrorMessage('');
        }, 2000);
      });
  }

  const handleBan = () => {
    if (!currentChannel) return ;
    const targetUserUid : number = user.uid;
    const channelID : number = currentChannel.id;
    postBanUser(channelID, targetUserUid).then((res) => {
      setCurrentUser(myInfo);
      socket.emit('channel/leaveUpdate', {channelId: channelID, targetUid: null, granted: null})
      socket.emit('channel/sendMessage', {channelId: channelID, content: `${res.data} has been banned.`, isNotice: true})
    }).catch((err) => {
      setErrorMessage('Failed to ban user.');
      setIsNotificationVisible(true);
      setTimeout(() => {
        setIsNotificationVisible(false);
        setErrorMessage('');
      }, 2000);
    });
  }

  const handleKick = () => {
    if (!currentChannel) return ;
    const targetUserUid : number = user.uid;
    const channelID : number = currentChannel.id;
    postKickUser(channelID, targetUserUid).then((res) => {
      setCurrentUser(myInfo);
      socket.emit('channel/leaveUpdate', {channelId: channelID, targetUid: null, granted: null});
      socket.emit('channel/sendMessage', {channelId: channelID, content: `${res.data} has been kicked.`, isNotice: true})
    }).catch((err) => {
      setErrorMessage('Failed to kick user.');
      setIsNotificationVisible(true);
      setTimeout(() => {
        setIsNotificationVisible(false);
        setErrorMessage('');
      }, 2000);
    });
  }

  return (
    <>
    <div className={styles.buttonContainer}>
      <button className={styles.buttonBox} onClick={checkFriend(user.uid) ? handleDeleteFriend : handleAddFriend}>
        <img
          className={styles.imageBox}
          src={checkFriend(user.uid) ? minus : addFriend}
          alt="addFriend"
          width={60}
          height={60}
        />
      </button>
      <button className={styles.buttonBox} onClick={handleDM}>
        <img
          className={styles.imageBox}
          src={dm}
          alt="dm"
          width={60}
          height={60}
        />
      </button>
      <button className={styles.buttonBox} onClick={handleInviteMatch}>
        <img
          className={styles.imageBox}
          src={inviteMatch}
          alt="inviteMatch"
          width={60}
          height={60}
        />
      </button>
      <button className={styles.buttonBox} onClick={checkBlock(user.uid) ? handleUnblock : handleBlock}>
        <img
          className={styles.imageBox}
          src={checkBlock(user.uid)? unblock :  block}
          alt="block"
          width={60}
          height={60}
        />
      </button>
      <button className={styles.buttonBox} onClick={handleInviteChat}>
        <img
          className={styles.imageBox}
          src={invite}
          alt="invite"
          width={60}
          height={60}
        />
      </button>
    </div>
    {(activeTab === TabOptions.CHANNEL && !checkOwner(currentUserRole) && checkAdmin(myRole)) && <div className={styles.buttonContainer}>
      {checkOwner(myRole) &&
        <button className={styles.buttonBox}>
          <img
            className={styles.imageBox}
            src={checkAdmin(currentUserRole) ? revoke : grant}
            alt="grant"
            width={60}
            height={60}
            onClick={checkAdmin(currentUserRole) ? handleRevokeAdmin : handleSetAdmin}
          />
        </button>
      }
      <button className={styles.buttonBox} onClick={handleMute}>
        <img
          className={styles.imageBox}
          src={mute}
          alt="mute"
          width={60}
          height={60}
        />
      </button>
      <button className={styles.buttonBox} onClick={handleBan}>
        <img
          className={styles.imageBox}
          src={ban}
          alt="ban"
          width={60}
          height={60}
        />
      </button>
      <button className={styles.buttonBox} onClick={handleKick}>
        <img
          className={styles.imageBox}
          src={kick}
          alt="kick"
          width={60}
          height={60}
        />
      </button>
    </div>}
    </>
  );
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

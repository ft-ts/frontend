'use client'

import { createContext, useContext, useState } from "react";
import { UserStatus } from "../main/enum/UserStatus.enum";
import { User } from "../main/interface/User.interface";
import { getMyInfo } from "../axios/client";
import ChannelProps from "../main/left-wrapper/interfaces/channelProps";
import { ChannelUser } from "../main/mid-wrapper/chat/interfaces/channelUser.interface";
import DmItemProps from "../main/left-wrapper/interfaces/dmItemProps";
import { ChannelRole } from "../main/mid-wrapper/chat/enum/channelRole.enum";
import UserInterface from "../axios/interfaces/user.interface";

const globalContext = createContext({});

export enum TabOptions {
  ALL = "ALL",
  FRIENDS = "FRIENDS",
  CHANNEL = "CHANNEL",
}

export const GlobalContextProvider = ({ children }: any) => {
  const [activeTab, setActiveTab] = useState(TabOptions.ALL);
  const [myInfo, setMyInfo] = useState<User>(dummy);
  const [currentUser, setCurrentUser] = useState<User>(dummy);
  const [chId, setchId] = useState<number | null>(null);
  const [channelId, setChannelId] = useState<number | null>(null);
  const [channel, setChannel] = useState<ChannelProps | null>(null);
  const [myRole, setMyRole] = useState<ChannelRole>(ChannelRole.NORMAL);
  const [selectedDm, setSelectedDm] = useState<number | null>(null);
  const [channelMembers, setChannelMembers] = useState<ChannelUser[]>([]);
  const [password, setPassword] = useState<string | null>(null);
  const [isChannelNotificationVisible, setIsChannelNotificationVisible] = useState(false);
  const [channelErrorMessage, setChannelErrorMessage] = useState<string | null>(null);
  const [dmId, setDmId] = useState<number | null>(null);
  const [dmList, setDmList] = useState<DmItemProps[]>([]);
  const [ friendsList, setFriendsList ] = useState<User[]>([]);

  const value = {
    myInfo,
    setMyInfo,
    currentUser,
    setCurrentUser,
    chId,
    setchId,
    channelId,
    setChannelId,
    channel,
    setChannel,
    myRole,
    setMyRole,
    selectedDm,
    setSelectedDm,
    channelMembers,
    setChannelMembers,
    activeTab,
    setActiveTab,
    password,
    setPassword,
    isChannelNotificationVisible,
    setIsChannelNotificationVisible,
    channelErrorMessage,
    setChannelErrorMessage,
    dmId,
    setDmId,
    dmList,
    setDmList,
    friendsList,
    setFriendsList
  }
  return (
    <globalContext.Provider value={value}>
      {children}
    </globalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(globalContext);


const dummy = {
  uid: 1000,
  name: "dummy",
  avatar: "/asset/profile_dummy.png",
  email: "dummy@dummy.com",
  twoFactorAuth: true,
  status: UserStatus.ONLINE,
  rating: 1234,
  custom_wins: 1,
  custom_losses: 2,
  ladder_wins: 3,
  ladder_losses: 4,
}
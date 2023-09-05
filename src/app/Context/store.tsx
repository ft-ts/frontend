'use client'

import { createContext, useContext, useState } from "react";
import { UserStatus } from "../main/enum/UserStatus.enum";
import { User } from "../main/interface/User.interface";
import { getMyInfo } from "../api/client";
import ChannelProps from "../main/left-wrapper/interfaces/channelProps";
import { ChannelUser } from "../main/mid-wrapper/chat/interfaces/channelUser.interface";

const globalContext = createContext({});

export enum TabOptions {
  ALL = "ALL",
  FRIENDS = "FRIENDS",
  CHANNEL = "CHANNEL",
}

export const GlobalContextProvider = ({ children }: any) => {
  const [activeTab, setActiveTab] = useState(TabOptions.ALL);
  const [myInfo, setMyInfo] = useState<User>(dummy);
  const [channelId, setChannelId] = useState<number | null>(null);
  const [channel, setChannel] = useState<ChannelProps | null>(null);
  const [selectedDm, setSelectedDm] = useState<number | null>(null);
  const [channelMembers, setChannelMembers] = useState<ChannelUser[]>([]);

  const value = {
    myInfo,
    setMyInfo,
    channelId,
    setChannelId,
    channel,
    setChannel,
    selectedDm,
    setSelectedDm,
    channelMembers,
    setChannelMembers,
    activeTab,
    setActiveTab,
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
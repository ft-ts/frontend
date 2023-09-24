'use client'

import { createContext, useContext, useState } from "react";
import { UserStatus } from "../main/enum/UserStatus.enum";
import { User } from "../main/interface/User.interface";
import ChannelProps from "../main/left-wrapper/interfaces/channelProps";
import { DmListProps } from "../main/left-wrapper/interfaces/dmItemProps";
import { ChannelRole } from "../main/mid-wrapper/chat/enum/channelRole.enum";

const globalContext = createContext({});

export enum TabOptions {
  ALL = "ALL",
  FRIENDS = "FRIENDS",
  CHANNEL = "CHANNEL",
}

export const GlobalContextProvider = ({ children }: any) => {
  const [ activeTab, setActiveTab ] = useState(TabOptions.ALL);
  const [ myInfo, setMyInfo ] = useState<User>(dummy);
  const [ currentUser, setCurrentUser ] = useState<User>(dummy);
  const [ myRole, setMyRole ] = useState<ChannelRole>(ChannelRole.NORMAL);

  const [ currentChannel, setCurrentChannel ] = useState<ChannelProps | null>(null);
  const [ currentChannelId, setCurrentChannelId ] = useState<number | null>(null);
  const [ currentDmId, setCurrentDmId ] = useState<number | null>(null);
  const [ dmList, setDmList ] = useState<DmListProps[]>([]);

  const value = {
    myInfo,setMyInfo,
    currentUser, setCurrentUser,
    myRole, setMyRole,
    activeTab, setActiveTab,
    currentDmId, setCurrentDmId,
    currentChannel, setCurrentChannel,
    currentChannelId, setCurrentChannelId,
    dmList, setDmList,
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

export interface GlobalValues {
  myInfo: User,
  setMyInfo: React.Dispatch<React.SetStateAction<User>>,
  currentUser: User,
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>,
  myRole: ChannelRole,
  setMyRole: React.Dispatch<React.SetStateAction<ChannelRole>>,
  activeTab: TabOptions,
  setActiveTab: React.Dispatch<React.SetStateAction<TabOptions>>,
  currentDmId: number | null,
  setCurrentDmId: React.Dispatch<React.SetStateAction<number | null>>,
  currentChannel: ChannelProps | null,
  setCurrentChannel: React.Dispatch<React.SetStateAction<ChannelProps | null>>,
  currentChannelId: number | null,
  setCurrentChannelId: React.Dispatch<React.SetStateAction<number | null>>,
  dmList: DmListProps[],
  setDmList: React.Dispatch<React.SetStateAction<DmListProps[]>>,
}
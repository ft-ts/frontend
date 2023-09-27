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

  const [activeTab, setActiveTab] = useState(TabOptions.ALL);
  const [myInfo, setMyInfo] = useState<User>(dummy);
  const [currentUser, setCurrentUser] = useState<User>(dummy);
  const [myRole, setMyRole] = useState<ChannelRole>(ChannelRole.NORMAL);
  const [currentUserRole, setCurrentUserRole] = useState<ChannelRole | null>(null);
  const [blockList, setBlockList] = useState<number[]>([]);
  const [isNewMyChannel, setIsNewMyChannel] = useState<boolean>(false);

  const [currentChannel, setCurrentChannel] = useState<ChannelProps | null>(null);
  const [currentChannelId, setCurrentChannelId] = useState<number | null>(null);
  const [currentDmId, setCurrentDmId] = useState<number | null>(null);
  const [dmList, setDmList] = useState<DmListProps[]>([]);
  const [isNotificationVisible, setIsNotificationVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [ channelFlag, setChannelFlag ] = useState<boolean>(false);
  const [ channelListFlag, setChannelListFlag ] = useState<boolean>(false);
  const [ userListFlag, setUserListFlag ] = useState<boolean>(false);
  const [ userProfileFlag, setUserProfileFlag ] = useState<boolean>(false);
  const [ myInfoFlag, setMyInfoFlag ] = useState<boolean>(false);
  const [ userInfoFlag, setUserInfoFlag ] = useState<boolean>(false);
  const [ initFlag, setInitFlag ] = useState<boolean>(false);

  const value = {
    myInfo, setMyInfo,
    currentUser, setCurrentUser,
    myRole, setMyRole,
    currentUserRole, setCurrentUserRole,
    activeTab, setActiveTab,
    currentDmId, setCurrentDmId,
    currentChannel, setCurrentChannel,
    currentChannelId, setCurrentChannelId,
    dmList, setDmList,
    blockList, setBlockList,
    isNotificationVisible, setIsNotificationVisible,
    errorMessage, setErrorMessage,
    isNewMyChannel, setIsNewMyChannel,
    channelFlag, setChannelFlag,
    channelListFlag, setChannelListFlag,
    userListFlag, setUserListFlag,
    userProfileFlag, setUserProfileFlag,
    myInfoFlag, setMyInfoFlag,
    userInfoFlag, setUserInfoFlag,
    initFlag, setInitFlag,
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
  name: "loading... ",
  avatar: "/asset/profile_dummy.png",
  email: "loading@dummy.com",
  twoFactorAuth: false,
  status: UserStatus.ONLINE,
  rating: 1000,
  custom_wins: 0,
  custom_losses: 0,
  ladder_wins: 0,
  ladder_losses: 0,
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
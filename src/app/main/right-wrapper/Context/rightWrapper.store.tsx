'use client'

import { createContext, useContext, useState } from "react";
import { User } from "../../interface/User.interface";

const rightWrapperContext = createContext({});

export const RightWrapperContextProvider = ({ children }: any) => {
  const [editModalOn, setEditModalOn] = useState(false);
  const [userList, setUserList] = useState<User[]>([]);
  const [friendList, setFriendList] = useState<User[]>([]);
  const [channelMembers, setChannelMembers] = useState<User[]>([]);

  const value: ValueInterface = {
    editModalOn, setEditModalOn,
    userList, setUserList,
    friendList, setFriendList,
    channelMembers, setChannelMembers,
  }
  return (
    <rightWrapperContext.Provider value={value}>
      {children}
    </rightWrapperContext.Provider>
  )
}

export const useRightWrapperContext = () => useContext(rightWrapperContext);

export interface ValueInterface {
  editModalOn: boolean,
  setEditModalOn: React.Dispatch<React.SetStateAction<boolean>>,
  userList: User[],
  setUserList: React.Dispatch<React.SetStateAction<User[]>>,
  friendList: User[],
  setFriendList: React.Dispatch<React.SetStateAction<User[]>>,
  channelMembers: User[],
  setChannelMembers: React.Dispatch<React.SetStateAction<User[]>>,
}
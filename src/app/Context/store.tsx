'use client'

import { createContext, useContext, useState } from "react";
import { UserStatus } from "../main/enum/UserStatus.enum";
import { User } from "../main/interface/User.interface";

const globalContext = createContext({});

export const GlobalContextProvider = ({ children }: any) => {
  const [myInfo, setMyInfo] = useState<User>({
    uid: 98267,
    name: "dohtyleee",
    avatar: "https://cdn.intra.42.fr/users/cde32eb6c2fcfc6871aa7405912c40a7/dohyulee.jpg",
    email: "123@m.com",
    twoFactorAuth: false,
    status: UserStatus.ONLINE,
    rating: 1000,
    custom_wins: 0,
    custom_losses: 0,
    ladder_wins: 0,
    ladder_losses: 0,
  });

  const value = {
    myInfo,
    setMyInfo,
  }
  return (
    <globalContext.Provider value={value}>
      {children}
    </globalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(globalContext);

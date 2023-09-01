'use client'
import { io } from "socket.io-client";
import { useEffect } from "react";
import { useGlobalContext } from "@/app/Context/store";

export const socket = io("http://localhost:10000", {
    autoConnect: false,
  });

export const CheckAuth = () => {
  const {myInfo, setMyInfo}: any = useGlobalContext();

  useEffect(() => {
    if (myInfo) {
      socket.auth = { uid: myInfo.uid };
      socket.connect();
    }

    return () => {
      socket.disconnect();
      console.log(`disconnected by unmounting`);
    }
  }, []);

  return (
    <></>
  )
}
'use client'
import { io } from "socket.io-client";
import { useEffect } from "react";


export const socket = io("http://localhost:10000", {
    autoConnect: false,
  });

export const CheckAuth = () => {
  useEffect(() => {
    socket.auth = {
      "token": localStorage.getItem("accessToken") as string,
    }

    socket.connect();

    socket.on("connect", () => {
      console.log(`connect`);
    });

    socket.on("disconnect", () => {
      console.log(`disconnect`);
    });

    return () => {
      socket.disconnect();
      console.log(`disconnected by unmounting`);
    }
  }, []);

  return (
    <></>
  )
}
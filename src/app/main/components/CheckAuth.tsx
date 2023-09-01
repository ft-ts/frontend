import { io } from "socket.io-client";
import { useRouter } from "next/router";
import { useEffect } from "react";


export const socket = io("http://localhost:10000", {
  autoConnect: false,
  extraHeaders: {
    "Authorization": process.env.AT as string,
  }
});

export const CheckAuth = () => {
  useEffect(() => {
    localStorage.setItem("accessToken", process.env.AT as string);
    localStorage.setItem("refreshToken", process.env.RT as string);


    console.log(`socket: `, socket);
    
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
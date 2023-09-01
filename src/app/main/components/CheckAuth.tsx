import { io } from "socket.io-client";
import { useRouter } from "next/router";
import { useEffect } from "react";


export const socket = io("http://localhost:10000", {
  autoConnect: false,
  extraHeaders: {
    "Authorization": localStorage.getItem("accessToken") as string,
  }
});

export const CheckAuth = () => {
  useEffect(() => {

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
import { io } from "socket.io-client";
import { useRouter } from "next/router";
import { useEffect } from "react";

const tokens = {
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjk4MjY3LCJlbWFpbCI6ImRvaHl1bGVlQHN0dWRlbnQuNDJzZW91bC5rciIsInR3b0ZhY3RvckF1dGgiOmZhbHNlLCJpYXQiOjE2OTM1NDQ4NzYsImV4cCI6MTY5MzU4ODA3Nn0.bghVSgFCUcvWl-d4PXv3Xe4IaklfeFjdyd58KaMcY7Y",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjk4MjY3LCJlbWFpbCI6ImRvaHl1bGVlQHN0dWRlbnQuNDJzZW91bC5rciIsImlhdCI6MTY5MzU0NDg3NiwiZXhwIjoxNjk0MTQ5Njc2fQ.TqgWEtYD5mWn-Xoizk6dvIm_Lfb09zRburaOs2zKHUg"
}

export const socket = io("http://localhost:10000", {
  autoConnect: false,
  extraHeaders: {
    "Authorization": tokens.accessToken,
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
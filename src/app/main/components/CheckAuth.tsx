'use client'
import { io } from "socket.io-client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export const socket = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
  autoConnect: false,
});

const originalEmit = socket.emit.bind(socket);

export const CheckAuth = () => {
  const router = useRouter();

  useEffect(() => {
    socket.emit = (ev: string, ...args: any[]): any => {

      if ((socket.auth as any).token !== document.cookie.split("accessToken=")[1]?.split(";")[0]) {
        alert("인증정보 변경이 감지되었습니다. 로그인 페이지로 이동합니다.")
        router.push("/login");
      }
      originalEmit(ev, ...args);
    }

    socket.auth = {
      token: document.cookie.split("accessToken=")[1].split(";")[0],
    }

    socket.connect();

    socket.on("redirect", (url: string) => {
      router.push(url);
    });

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
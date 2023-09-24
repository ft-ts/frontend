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

    const socketToken = (socket.auth as any)?.token;
    const cookieToken = document.cookie.split("accessToken=")[1]?.split(";")[0];

    if (!cookieToken) {
      alert("로그인이 필요합니다.");
      router.replace("/login");
    }

    console.log(`socketToken: ${socketToken}`);
    console.log(`cookieToken: ${cookieToken}`);

    socket.emit = (ev: string, ...args: any[]): any => {

      if (socketToken && socketToken !== cookieToken) {
        alert("인증정보 변경이 감지되었습니다. 로그인 페이지로 이동합니다.")
        router.replace("/login");
      }
      originalEmit(ev, ...args);
    }

    if (document.cookie.split("accessToken=")[1]) {
      socket.auth = {
        token: document.cookie.split("accessToken=")[1].split(";")[0],
      }
    } else {
      alert("로그인이 필요합니다.");
      router.replace("/login");
    }

    socket.connect();

    socket.on("redirect", (url: string) => {
      router.replace(url);
    });

    socket.on("connect", () => {
      console.log(`connect`);
    });

    socket.on("disconnect", () => {
      console.log(`disconnect`);
    });

    return () => {
      socket.disconnect();
      console.log(`socket disconnected by unmounting`);
    }
  }, []);

  return (
    <></>
  )
}

interface AuthToken {
  token: string;
}
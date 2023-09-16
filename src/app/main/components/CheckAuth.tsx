'use client'
import { io } from "socket.io-client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const socket = io("http://localhost:10000", {
    autoConnect: false,
  });

const originalEmit = socket.emit.bind(socket);

export const CheckAuth = () => {
  const router = useRouter();

  useEffect(() => {
    socket.emit = (ev: string, ...args: any[]): any => {
      if (!document.cookie.includes("accessToken=")) {
        router.push("/login");
        return;
      }
      socket.auth = {
        "token": document.cookie.split("accessToken=")[1]?.split(";")[0],
      }
      originalEmit(ev, ...args);
    }

    socket.auth = {
      "token": document.cookie.split("accessToken=")[1].split(";")[0],
    }

    socket.connect();

    socket.on("redirect", (url: string) => {
      console.log(`ws redirect to ${url}`);
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
import { io } from "socket.io-client";

const BACKEND_URL = "http://10.19.209.187:10000/channels"; // 백엔드 소켓 서버 URL
const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjExMTEsImVtYWlsIjoiQUFBQUBnbWFpbC5jb20iLCJ0d29GYWN0b3JBdXRoIjpmYWxzZSwiaWF0IjoxNjkyMTYwNTc0LCJleHAiOjE2OTIyMDM3NzR9.xHpXcgvom_2p52sIbby91XdsGIGeyvix0LfqNMu_tX4";
export const socket = io(BACKEND_URL, {
  extraHeaders: {
    Authorization: AUTH_TOKEN,
  },
});
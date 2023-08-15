import { io } from "socket.io-client";

const BACKEND_URL = "http://10.19.209.187:10000/channels"; // 백엔드 소켓 서버 URL
const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEwMDAwMiwiZW1haWwiOiJzaWVsZWVAc3R1ZGVudC40MnNlb3VsLmtyIiwidHdvRmFjdG9yQXV0aCI6ZmFsc2UsImlhdCI6MTY5MjA3NTI2NywiZXhwIjoxNjkyMTE4NDY3fQ.qL93uJ_Hlo201ZCJ-gmR7dcdBU1Fa0HJ8vbKrq7XWwI";
export const socket = io(BACKEND_URL, {
  extraHeaders: {
    Authorization: AUTH_TOKEN,
  },
});
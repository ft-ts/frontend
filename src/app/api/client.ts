"use client";

import axios from "axios";
import { io } from "socket.io-client";
import  UserInterface  from "./interfaces/user.interface";
/////////////////////////////////////////////////////////////////////
const tokens = {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEwMDAwMiwiZW1haWwiOiJzaWVsZWVAc3R1ZGVudC40MnNlb3VsLmtyIiwidHdvRmFjdG9yQXV0aCI6ZmFsc2UsImlhdCI6MTY5MzM3MDczNiwiZXhwIjoxNjkzNDEzOTM2fQ.XiwrhbEkDV3VBgyACRkWFtpf6o4873bTBnAipChshlE",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEwMDAwMiwiZW1haWwiOiJzaWVsZWVAc3R1ZGVudC40MnNlb3VsLmtyIiwiaWF0IjoxNjkzMzcwNzM2LCJleHAiOjE2OTM5NzU1MzZ9.ALm5OKPeF3RZDF4YiJlvpQKnWpwmifj2HJ5wMojCLzk"
};


const BACKEND_URL = "http://localhost:10000/channels"; // 백엔드 소켓 서버 URL
// const BACKEND_URL = "http://10.19.209.187:10000/channels"; // 백엔드 소켓 서버 URL


const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEwMDAwMiwiZW1haWwiOiJzaWVsZWVAc3R1ZGVudC40MnNlb3VsLmtyIiwidHdvRmFjdG9yQXV0aCI6ZmFsc2UsImlhdCI6MTY5MzM3MDczNiwiZXhwIjoxNjkzNDEzOTM2fQ.XiwrhbEkDV3VBgyACRkWFtpf6o4873bTBnAipChshlE";
export const socket_channel = io(BACKEND_URL, {
  extraHeaders: {
    Authorization: AUTH_TOKEN,
  },
});

localStorage.setItem("accessToken", tokens.accessToken);
localStorage.setItem("refreshToken", tokens.refreshToken);
/////////////////////////////////////////////////////////////////////

export const apiClient = axios.create({
    baseURL: "http://localhost:10000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use((config) => {
    console.log("interceptors.request", config);
    const token = tokens.accessToken;
    if (token && config.headers)
        config.headers["Authorization"] = `Bearer ${token}`;
    else
        console.log("No token");
    return config;
});

export async function getMyInfo(): Promise<any> {
    return apiClient.get("/users");
};

export async function getUserList(): Promise<any> {
    return apiClient.get("/users/all");
}

export async function getUserByUid(uid: number): Promise<UserInterface> {
    return apiClient.get(`/users/${uid}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
}


// // Auth
// export async function signInApi(email, password) {
//     return apiClient.post("/auth/signin", { email, password });
// };

// export async function signUpApi(email, password) {
//     return apiClient.post("/auth/signup", { email, password });
// };

// // Todo
// export async function getTodoApi() {
//     return apiClient.get("/todos");
// };

// export async function postTodoApi(todo) {
//     return apiClient.post("/todos", {todo});
// };

// export async function updateTodoApi(id, body) {
//     return apiClient.put(`/todos/${id}`, body);
// };

// export async function deleteTodoApi(id) {
//     return apiClient.delete(`/todos/${id}`);
// };
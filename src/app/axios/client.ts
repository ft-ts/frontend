"use client";

import axios from "axios";
import UserInterface from "./interfaces/user.interface";

export const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // cookie 수신, 전송 허용
});

const source = axios.CancelToken.source();

apiClient.interceptors.request.use((config) => {
  if (config.headers && document.cookie) {
    document.cookie.split(';').forEach((item) => {
      if (item.includes("accessToken"))
        config.headers["Authorization"] = `Bearer ${item.split('=')[1]}`;
    });
  }
  else {
    source.cancel('Request canceled, no token found.');
  }
  return config;
});

apiClient.interceptors.response.use((response) => {
  if (response.status === 200 && response.data?.redirectUrl) {
    window.location.href = response.data.redirectUrl;
    // alert("로그인이 필요합니다.")
  }
  return response;
});

export async function getMyInfo(): Promise<any> {
  return apiClient.get("/users");
};

export async function getUserList(): Promise<any> {
  return apiClient.get("/users/all");
}

export async function getUserListExceptMe(): Promise<any> {
  return apiClient.get("/users/all/except/me");
}

export async function getFreiendsList(): Promise<any> {
  return apiClient.get("/users/friends");
}

export async function getUserByUid(uid: number): Promise<any> {
  return apiClient.get(`/users/${uid}`);
}

export async function getGameHistory(name: string): Promise<any> {
  return apiClient.get(`/pong/${name}`);
}

export async function getDmLists(): Promise<any> {
  return apiClient.get(`/dm/list`);
}

export async function getDm(targetUid: number): Promise<any> {
  return apiClient.get(`/dm/${targetUid}`);
}

export async function postFriend(uid: number): Promise<any> {
  return await apiClient.post(`/users/friends`, {data: {targetUid: uid}});
}

export async function deleteFriend(uid: number): Promise<any> {
  return await apiClient.delete(`/users/friends`, { data: { targetUid: uid } });
}
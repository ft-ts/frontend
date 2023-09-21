"use client";

import axios from "axios";
import UserInterface from "./interfaces/user.interface";

export const apiClient = axios.create({
  baseURL: "http://localhost:10000/api",
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

/* src/app/main */
export async function getMyInfo(): Promise<any> {
  return apiClient.get("/users");
};

/* userList.page.tsx */
export async function getUserListExceptMe(): Promise<any> {
  return apiClient.get("/users/all/except/me");
}

/*  userList.page.tsx */
export async function getFreiendsList(): Promise<any> {
  return apiClient.get("/users/friends");
}

export async function postCreateChannel(title: string, mode: string, password: string): Promise<any> {
  const payload = { title: title, mode: mode, password: password };
  return await apiClient.post("/channels/create", payload);
}

export async function getChannelList(): Promise<any> {
  return await apiClient.get("/channels/list/all");
}

export async function getMyChannelList(): Promise<any> {
  return await apiClient.get("/channels/list/my");
}

/* channel.tsx */
export async function getChannelProps(channelId : number): Promise<any> {
  return await apiClient.get(`/channels/props/${channelId}`);
}

export async function getMyChannelRole(channelId : number): Promise<any> {
  return await apiClient.get(`/channels/role/${channelId}`);
}

/*
  channel.tsx
*/
export async function getChannelMembers(channelId : number): Promise<any> {
  return await apiClient.get(`/channels/members/${channelId}`);
}

/*
  dm.tsx
  chatMenu.tsx
  messageItem.tsx
  userProfile.button.tsx
*/
export async function getUserByUid(uid: number): Promise<any> {
  return apiClient.get(`/users/${uid}`);
}

/*
  game.search.tsx
*/
export async function getGameHistory(name: string): Promise<any> {
  return apiClient.get(`/pong/${name}`);
}

/*
  dm.tsx
*/
export async function getDmLists(): Promise<any> {
  return apiClient.get(`/dm/list`);
}

/*
  chatRoom.tsx
*/
export async function getDirectMessages(uid: number): Promise<any> {
  return await apiClient.get(`/dm/${uid}`);
}

export async function postDmRead(uid: number): Promise<any> {
  return await apiClient.post(`/dm/read`, {data: {targetUid: uid}});
}

/*
  chatRoom.tsx
*/
export async function getChannelMessages(channelId: number): Promise<any> {
  return await apiClient.get(`/channels/log/${channelId}`);
}

export async function postBanUser(channelId: number, uid: number): Promise<any> {
  const payload = { channelId: channelId, targetUid: uid};
  return await apiClient.post(`/channels/ban`, payload);
}

export async function postUnbanUser(channelId: number, uid: number): Promise<any> {
  const payload = { channelId: channelId, targetUid: uid};
  return await apiClient.post(`/channels/unban`, payload);
}

export async function postKickUser(channelId: number, uid: number): Promise<any> {
  const payload = { channelId: channelId, targetUid: uid};
  return await apiClient.post(`/channels/kick`, payload);
}

export async function postInviteUser(channelId: number, uid: number): Promise<any> {
  const payload = { channelId: channelId, targetUid: uid};
  return await apiClient.post(`/channels/invite`, payload);
}

export async function postGrantAdmin(channelId: number, uid: number): Promise<any> {
  const payload = { channelId: channelId, targetUid: uid};
  return await apiClient.post(`/channels/grant/admin`, payload);
}

export async function postRevokeAdmin(channelId: number, uid: number): Promise<any> {
  const paylaod = { channelId: channelId, targetUid: uid};
  return await apiClient.post(`/channels/revoke/admin`, paylaod);
}

/*
  userProfile.tsx
*/
export async function postFriend(uid: number): Promise<any> {
  return await apiClient.post(`/users/friends`, {data: {targetUid: uid}});
}

/*
  userList.friend.tsx
*/
export async function deleteFriend(uid: number): Promise<any> {
  return await apiClient.delete(`/users/friends`, { data: { targetUid: uid } });
}

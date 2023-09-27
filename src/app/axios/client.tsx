"use client";

import axios from "axios";
import { ChannelMode } from "../main/left-wrapper/enum/channel.enum";
import { useGlobalContext } from "../Context/store";

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
    console.log('Request canceled, no token found.');
    
  }
  return config;
});

apiClient.interceptors.response.use((response) => {

  if (response?.data?.message)
  if (response.status === 200 && response.data?.redirectUrl)
    window.location.href = response.data.redirectUrl;
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
export async function getFriendsList(): Promise<any> {
  return apiClient.get("/users/friends");
}

/* channel.tsx */

export async function postChannelUpdate(channelId: number, title: string, mode: ChannelMode, password?: string): Promise<any> {
  const payload = { channelId: channelId, title,password: password, mode };
  return await apiClient.post("/channels/update", payload);
}

export async function postCreateChannel(title: string, mode: string, password: string): Promise<any> {
  const payload = { title: title, mode: mode, password: password };
  return await apiClient.post("/channels/create", payload);
}

export async function postUpdateChannel(channelId: number, title: string, mode: string, password: string): Promise<any> {
  const payload = { channelId: channelId, title: title, mode: mode, password: password };
  return await apiClient.post("/channels/update", payload);
}

export async function getChannelList(): Promise<any> {
  return await apiClient.get("/channels/list/all");
}

export async function getMyChannelList(): Promise<any> {
  return await apiClient.get("/channels/list/my");
}

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

export async function postMuteUser(channelId: number, uid: number): Promise<any> {
  const payload = { channelId: channelId, targetUid: uid};
  return await apiClient.post(`/channels/mute`, payload);
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
  const payload = { channelId: channelId, targetUid: uid};
  return await apiClient.post(`/channels/revoke/admin`, payload);
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

export async function postBlockUser(targetUid: number): Promise<any> {
  return await apiClient.post(`/users/block`, {data: {targetUid: targetUid}});
}

export async function deleteBlockUser(targetUid: number): Promise<any> {
  return await apiClient.delete(`/users/block`, { data: { targetUid: targetUid } });
}

export async function joinChannel(channelId: number, password: string): Promise<any> {
  const payload = { channelId: channelId, password: password};
  return await apiClient.post(`/channels/join`, payload);
}

export async function leaveChannel(channelId: number) {
  const payload = { channelId: channelId};
  return await apiClient.post(`/channels/leave`, payload);
}
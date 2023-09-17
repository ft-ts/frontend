"use client";

import axios from "axios";
import UserInterface from "./interfaces/user.interface";

export const apiClient = axios.create({
    baseURL: "http://localhost:10000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use((config) => {
    if (config.headers)
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
    return config;
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
    return apiClient.post(`/users/friends`, { targetUid: uid});
}

export async function updateUser(userData: Partial<UserInterface>): Promise<any> {
    return apiClient.patch(`/users`, userData);
}
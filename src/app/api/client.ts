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

export async function getUserByUid(uid: number): Promise<any> {
    return apiClient.get(`/users/${uid}`);
}

export async function getGameHistory(name: string): Promise<any> {
    return apiClient.get(`/pong/${name}`);
}
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
    console.log("interceptors.request", config);
    if (config.headers)
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
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
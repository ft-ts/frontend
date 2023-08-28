import axios from "axios";

/////////////////////////////////////////////////////////////////////
const tokens = {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjk4MjY3LCJlbWFpbCI6ImRvaHl1bGVlQHN0dWRlbnQuNDJzZW91bC5rciIsInR3b0ZhY3RvckF1dGgiOmZhbHNlLCJpYXQiOjE2OTMxODkzODcsImV4cCI6MTY5MzIzMjU4N30.SR1w63Mlzvq1jKdfwa3hz_FI6zOGMqb8jBoQ1IXunUU",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjk4MjY3LCJlbWFpbCI6ImRvaHl1bGVlQHN0dWRlbnQuNDJzZW91bC5rciIsImlhdCI6MTY5MzE4OTM4NywiZXhwIjoxNjkzNzk0MTg3fQ.krHZo_1OaRDUdhsZ2KaVLAtS1x_8al6ji5KyW7BE8LQ"
};

localStorage.setItem("accessToken", tokens.accessToken);
localStorage.setItem("refreshToken", tokens.refreshToken);
/////////////////////////////////////////////////////////////////////

export const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:10000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token && config.headers)
        config.headers["Authorization"] = `Bearer ${token}`;
    return config;
});

export async function getMyInfo(): Promise<any> {
    return apiClient.get("/users", {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
};

export async function getUserList(): Promise<any> {
    return apiClient.get("/users/all", {
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
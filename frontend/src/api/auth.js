import axios from "axios"

const API = axios.create({
    baseURL: "http://localhost:5000/api/v1/auth"
});   //creates a custom axios instance

export const registerUser = (data) => API.post("/register", data);

export const loginUser = (data) => API.post("/login", data);

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});   //This runs before every request

export const getProfile = () => API.get("/profile");





// fetch("http://localhost:5000/api/v1/auth/login", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify(data)
// })
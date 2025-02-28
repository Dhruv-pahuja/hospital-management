import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:4000/api",
    headers: { "Content-Type": "application/json" }
});

export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (userData) => API.post("/auth/login", userData);

import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.BASE_BACKEND_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});
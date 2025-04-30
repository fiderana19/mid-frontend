import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosAuthInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

axiosAuthInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => Promise.reject(error)
)

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

export default axiosAuthInstance;
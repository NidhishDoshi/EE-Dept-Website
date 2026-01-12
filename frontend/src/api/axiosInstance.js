import axios from "axios";

// 1. Define your backend URL
// Use environment variable with fallback for development
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://10.195.250.60:1337/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
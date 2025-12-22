import axios from "axios";

// 1. Define your backend URL
// For local Strapi development, this is usually http://localhost:1337/api
const BASE_URL = "http://localhost:1337/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
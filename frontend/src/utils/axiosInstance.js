import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://herbverse-backend-xg7z.onrender.com", // backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor to attach token automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error) // handle errors in request setup
);


export default axiosInstance;


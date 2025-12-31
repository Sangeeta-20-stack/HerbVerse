import axios from "axios";

const API = axios.create({
  baseURL: "https://herbverse-backend-xg7z.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const getAllTours = () => API.get("/tours");
export const getTourById = (id) => API.get(`/tours/${id}`);


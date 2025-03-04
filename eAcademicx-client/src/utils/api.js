import axios from "axios";

// Create axios instance with base URL
export const api = axios.create({
  baseURL: "http://localhost:5000/api/users", // Backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    const { data } = await api.post("/auth/login", credentials);
    return data;
  },
  register: async (userData: {
    email: string;
    password: string;
    name: string;
    role: string;
  }) => {
    const { data } = await api.post("/auth/register", userData);
    return data;
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};

export const userApi = {
  getProfile: async () => {
    const { data } = await api.get("/users/profile");
    return data;
  },
};

export default api;

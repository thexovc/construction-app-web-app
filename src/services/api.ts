import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: `http://localhost:3000/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    const { data } = await api.post("/auth/login", credentials);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    Cookies.set("token", data.token, { secure: true, sameSite: "strict" });
    Cookies.set("user", JSON.stringify(data.user), {
      secure: true,
      sameSite: "strict",
    });
    return data;
  },
  register: async (userData: {
    email: string;
    password: string;
    fullName: string;
    role: string;
  }) => {
    let url = "/auth/register";
    if (userData.role === "RIDER") {
      url = "/auth/register/rider";
    } else if (userData.role === "VENDOR") {
      url = "/auth/register/vendor";
    } else {
      url = "/auth/register/buyer";
    }

    const { data } = await api.post(url, userData);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    Cookies.set("token", data.token, { secure: true, sameSite: "strict" });
    Cookies.set("user", JSON.stringify(data.user), {
      secure: true,
      sameSite: "strict",
    });
    return data;
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    Cookies.remove("token");
    Cookies.remove("user");
  },
};

export const userApi = {
  getProfile: async () => {
    const { data } = await api.get("/users/profile");
    return data;
  },
};

export default api;

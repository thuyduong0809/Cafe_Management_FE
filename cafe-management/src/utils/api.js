import axios from "axios";
import { message } from "antd";

const BASE_URL = "http://localhost:8081/myapp/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      message.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } else {
      const errorMsg =
        error?.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại.";
      message.error(errorMsg);
    }

    return Promise.reject(error);
  }
);

export default api;

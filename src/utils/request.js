import axios from "axios";

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
});

// 请求头
service.interceptors.request.use((config) => {
  config.headers = {
    "Content-Type": "application/json",
    "X-Open-Token": import.meta.env.VITE_APP_OPEN_TOKEN,
  };
  return config;
});

// 响应处理
service.interceptors.response.use((res) => {
  if (res.data.code !== 0) throw new Error(res.data.msg);
  return res.data.data;
});

export default service;

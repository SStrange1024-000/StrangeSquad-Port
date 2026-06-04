import axios from "axios";
import { getItem, KEY_ACCESS_TOKEN, removeItem, setItem } from "./localStorage";

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
  withCredentials: true,
});

// It sends authorization header to every request automatically.

axiosClient.interceptors.request.use((request) => {
  const accessToken = getItem(KEY_ACCESS_TOKEN);
  request.headers["Authorization"] = `Bearer ${accessToken}`;

  return request;
});

axiosClient.interceptors.response.use(async (response) => {
  const data = response.data;

  console.log("Data At initail phase", data);

  if (data.status === "ok") {
    return data;
  }

  console.log("Hi kid 2", data.statusCode);

  const originalRequest = response.config;
  const statusCodes = data.statusCode;
  const error = data.error;

  // if (statusCodes === 401 && originalRequest.url === "/auth/refresh") {
  //   removeItem(KEY_ACCESS_TOKEN);
  //   window.location.replace("/login", "_self");
  //   return Promise.reject(error);
  // }

  if (statusCodes === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    // Chect at once
    const response = await axiosClient
      .create({
        withCredentials: true,
      })
      .get("/auth/refresh");

    const newAccessToken = response.data.message.accessToken;

    console.log("get response from backend", response.data);

    if (response.data.status === "ok" || response.status === "ok" || response.data.statusCode === 200) {
      setItem(KEY_ACCESS_TOKEN, newAccessToken);
      originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

      return axiosClient(originalRequest);
    } else {
      removeItem(KEY_ACCESS_TOKEN);
      window.location.replace("/login", "_self");
      return Promise.reject(error);
    }
  }
  return Promise.reject(error);
});

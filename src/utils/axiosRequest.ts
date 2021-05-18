import axios, { AxiosRequestConfig } from "axios";
import authService from "../services/AuthService";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (
      error.response.data.detail === "Login time for token has been expired"
    ) {
      const originalRequest = error.config;
      console.log(originalRequest);
      if (!originalRequest._retry) {
        try {
          authService.updateJwtToken();
          originalRequest._retry = true;
          axiosInstance(originalRequest);
        } catch (error) {
          throw new Error(error.response.data.message);
        }
      }
    }
    throw new Error(error.response.data.message);
  }
);

export const axiosRequest = ({
  url = window.location.hostname + ":8000",
  method = "GET",
  params = {},
  data = {},
  headers = {},
}: AxiosRequestConfig) => {
  if (headers && headers.authorization) {
    headers.authorization = `Bearer ${authService.getJwtTokenFromStorage()}`;
  }
  return axios({
    url,
    method,
    params,
    data,
    headers,
  });
};

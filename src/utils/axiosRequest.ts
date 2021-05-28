import axios, { AxiosRequestConfig } from "axios";
import AuthService from "../services/AuthService";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (
      error.response.data.detail === "Login time for token has been expired"
    ) {
      const originalRequest = error.config;
      if (!originalRequest._retry) {
        try {
          const newJwt = (await AuthService.updateJwtToken()).access_token;
          originalRequest._retry = true;
          return await axiosInstance({
            ...originalRequest,
            headers: {
              ...originalRequest.headers,
              authorization: `Bearer ${newJwt}`,
            },
          });
        } catch (error) {
          throw new Error(
            error.response.data.detail || error.response.data.message
          );
        }
      }
    } else if (
      error.response.data.detail === "Could not validate credentials"
    ) {
      await AuthService.logout();
    } else
      throw new Error(
        error.response.data.detail || error.response.data.message
      );
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
    headers.authorization = `Bearer ${AuthService.getJwtTokenFromStorage()}`;
  }
  return axiosInstance({
    url,
    method,
    params,
    data,
    headers,
  });
};

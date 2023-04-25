import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:1880",
} as AxiosRequestConfig);


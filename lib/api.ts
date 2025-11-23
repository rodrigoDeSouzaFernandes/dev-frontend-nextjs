import axios, { AxiosInstance } from "axios";

const FIVE_SECONDS = 5_000;

export const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  timeout: FIVE_SECONDS,
});

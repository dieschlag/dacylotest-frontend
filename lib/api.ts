"use client";

import axios from "axios";
import { redirect } from "next/navigation";

const baseUrl = process.env.API_URL || "http://localhost:3001";

export const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // need to use winow.location because hooks are only called in React components
      const pathname = window.location.pathname;
      console.log(pathname);
      console.log(pathname.includes("/login"));
      console.log("here");
      if (!pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

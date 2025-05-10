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
      // redirects user to login view with correct locale
      // need to use winow.location because hooks are only called in React components
      const pathname = window.location.pathname;
      const locale = pathname.split("/")[1];
      if (!pathname.includes("/login")) {
        window.location.href = `/${locale}/login`;
        redirect(`/${locale}/login`);
      }
    }
    return Promise.reject(error);
  }
);

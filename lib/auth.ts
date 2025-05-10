"use client";

import { LoginResponse, RegisterResponse } from "@/app/types/auth";
import { api } from "./api";
import { isAxiosError } from "axios";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<LoginResponse> {
  try {
    const res = await api.post<LoginResponse>("/api/auth/login", {
      email,
      password,
    });

    localStorage.setItem("access_token", res.data.access_token!);
    return res.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return { message: error.response?.data?.message || "An error occurred" };
    }

    return { message: "An unexpected error occurred" };
  }
}

export async function register({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}): Promise<RegisterResponse> {
  try {
    const res = await api.post<RegisterResponse>("/api/auth/register", {
      email,
      password,
      username,
    });
    return res.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return { message: error.response?.data?.message || "An error occurred" };
    }

    return { message: "Unexpected error occurred" };
  }
}

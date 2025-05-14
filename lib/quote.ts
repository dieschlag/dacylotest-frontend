import { APIResponseType } from "@/types/api";
import { api } from "./api";
import { Quote } from "@/types/quote";
import { isAxiosError } from "axios";

export async function getRandomQuote(): Promise<APIResponseType<Quote>> {
  try {
    const response = await api.get<APIResponseType<Quote>>("/api/quote");
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data.message;
    } else {
      return { message: "An error occured" };
    }
  }
}

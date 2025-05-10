"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const formSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(1, "Enter a password"),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await login(values);

    if (response.message) {
      setErrorMessage(response.message);
    } else {
      redirect("/test");
    }
  }

  return (
    <div className="flex w-full h-full flex-col items-center overflow-y-scroll">
      <div className="flex flex-col items-center justify-center w-lg gap-10 p-10 pt-52">
        <h1 className="text-slate-800 text-2xl font-bold ">Login</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-600 font-bold text-lg">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      className="loginInput"
                      placeholder="Username"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-600 font-bold text-lg">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      className="loginInput"
                      placeholder="Password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="px-4 py-2 bg-slate-600 text-white font-bold"
              type="submit"
            >
              Login
            </Button>

            <p className="text-base text-red-500 font-bold">{errorMessage}</p>
          </form>
        </Form>
      </div>
    </div>
  );
}

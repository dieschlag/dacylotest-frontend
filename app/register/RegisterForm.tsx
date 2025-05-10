"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { register } from "@/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { redirect } from "next/navigation";

export function RegisterForm() {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const formSchema = z
    .object({
      email: z.string().email("Enter a valid email"),
      username: z.string().min(1, "Enter a username"),
      password: z.string().min(1, "Enter a password"),
      passwordConfirm: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: "Passwords do not match",
      path: ["passwordConfirm"],
    });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      passwordConfirm: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const body = {
      email: values.email,
      username: values.username,
      password: values.password,
    };

    const response = await register(body);

    if (response.message) {
      setErrorMessage(response.message);
    } else {
      redirect("/login");
    }
  }

  return (
    <div className="flex w-full h-full flex-col items-center overflow-y-scroll">
      <div className="flex flex-col items-center justify-center w-lg gap-10 p-10 pt-52">
        <h1 className="text-slate-800 text-2xl font-bold ">Register</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="gap-1">
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
              name="username"
              render={({ field }) => (
                <FormItem className="gap-1">
                  <FormLabel className="text-slate-600 font-bold text-lg">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
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

            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-600 font-bold text-lg">
                    Confirm Password
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

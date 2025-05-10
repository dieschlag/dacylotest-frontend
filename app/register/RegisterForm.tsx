"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export function RegisterForm() {
  const formSchema = z
    .object({
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
      username: "",
      password: "",
      passwordConfirm: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex w-full h-full flex-col items-center overflow-hidden">
      <div className="flex flex-col items-center justify-center w-lg gap-10 p-10 pt-52">
        <h1 className="text-slate-800 text-2xl font-bold ">Login</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <FormField
              control={form.control}
              name="username"
              render={() => (
                <FormItem className="gap-1">
                  <FormLabel className="text-slate-600 font-bold text-lg">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input className="loginInput" placeholder="Username" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={() => (
                <FormItem>
                  <FormLabel className="text-slate-600 font-bold text-lg">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input className="loginInput" placeholder="Password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passwordConfirm"
              render={() => (
                <FormItem>
                  <FormLabel className="text-slate-600 font-bold text-lg">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input className="loginInput" placeholder="Password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}

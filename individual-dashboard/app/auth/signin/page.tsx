"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

import {
  Button,
  GoogleButton,
  LinkedinButton,
} from "@/components/buttons/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form/form";
import { Input } from "@/components/form/input";
import { SessionState } from "http2";
import { NoOutlineButtonBig } from "@/components/shared/buttons";

const formSchema = z.object({
  email: z.string().min(8, {
    message: "Email must be at least 8 characters.",
  }),
});

export default function SignIn() {

  const onSubmit = (data: z.infer<typeof formSchema>) => {
      console.log(data);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <main className="text-white">
      <div className="mt-[30px] pb-5">
        <p className="text-center text-2xl font-bold">
          Sign in to Veridaq.com
        </p>
        <div className="max-w-md mx-auto px-10 sm:px-6 lg:px-8 pt-8">
          <GoogleButton />
          <br />
          <LinkedinButton />
          <div className="flex items-center justify-center text-center">
            <hr className="my-8 py-2 w-[60%]" />
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => onSubmit(data))}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-[20px]">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="example@mail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-center">
                <NoOutlineButtonBig type={"submit"} name={"Sign In"} />
              </div>
            </form>
          </Form>
          <p className="text-center pt-10 text-sm">
            By signing in you agree with our{" "}
            <span className="text-[#876FB2]">terms and conditions. </span>{" "}
          </p>
        </div>
      </div>
    </main>
  );
}

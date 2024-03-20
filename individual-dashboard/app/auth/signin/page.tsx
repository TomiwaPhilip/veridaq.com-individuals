"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getSession } from 'next-auth/react';
import { Session } from "next-auth";

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

const formSchema = z.object({
  email: z.string().min(8, {
    message: "Email must be at least 8 characters.",
  }),
});


export default function SignIn() {
  const [isClient, setIsClient] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    const { pathname } = window.location;
    setIsSignIn(pathname === "/sign-in");
  }, []);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (isSignIn) {
      console.log(data);
      router.push("/dashboard");
    } else {
      alert(data);
      router.push("/onboarding");
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  if (!isClient) {
    return null; // Return null while waiting for client-side rendering
  }

  return (
    <main className="text-white">
      <div className="pt-10 pb-5">
        <p className="text-center text-2xl font-bold">
          {isSignIn ? "Sign in" : "Sign up"} to continue to Veridaq.com
        </p>
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <GoogleButton />
          <br />
          <LinkedinButton />
          <div className="flex items-center justify-center text-center">
            <hr className="my-8 w-[60%]" />
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
                <Button type="submit" name={isSignIn ? "Sign In" : "Sign Up"} />
              </div>
            </form>
          </Form>
          <p className="text-center pt-4 text-sm">
            By {isSignIn ? "signing in" : "signing up"} you agree with our{" "}
            <span className="text-[#876FB2]">terms and conditions. </span>{" "}
          </p>
        </div>
      </div>
    </main>
  );
}



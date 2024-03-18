"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

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

const passwordSchema = z
  .string()
  .min(7, { message: "Password must be at least 7 characters." })
  .refine(
    (password) => {
      const hasUppercase = /[A-Z]/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      const hasDigit = /\d/.test(password);
      return hasUppercase && hasLowercase && hasDigit;
    },
    {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one digit.",
    },
  );

const formSchema = z.object({
  email: z.string().min(8, {
    message: "Email must be at least 8 characters.",
  }),
  password: passwordSchema,
});

export default function SignIn() {
  const [isClient, setIsClient] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const { pathname } = window.location;
    setIsSignIn(pathname === "/sign-in");
  }, []);

  const router = useRouter();

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
      password: "",
    },
  });

  if (!isClient) {
    return null; // Return null while waiting for client-side rendering
  }

  return (
    <main className="text-white">
      <div className="pt-5 pb-5">
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

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-[20px]">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="EXAMple123"
                        type="password"
                        {...field}
                      />
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

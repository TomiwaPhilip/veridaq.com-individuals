"use client";

import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/form/input";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useState, ChangeEvent, useRef } from "react";
import { updateUser } from "@/lib/actions/onboarding.action";
import { upload } from "@vercel/blob/client";

import { NoOutlineButtonBig } from "@/components/shared/buttons";
import { OnboardingValidation } from "@/lib/validations/onboarding";

export default function Onboard() {
  const router = useRouter();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof OnboardingValidation>>({
    resolver: zodResolver(OnboardingValidation),
  });

  const handleImage = async (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void,
  ) => {
    e.preventDefault();

    setLoading(true);

    const fileReader = new FileReader();
    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];

    fileReader.onload = async (e) => {
      const fileData = e.target?.result;
      if (typeof fileData === "string") {
        try {
          const newBlob = await upload(file.name, file, {
            access: "public",
            handleUploadUrl: "/api/avatar/upload",
          });

          // Update the form data with the new blob URL
          fieldChange(newBlob.url);
          setLoading(false);
          setDisable(false);
        } catch (error) {
          setLoading(false);
          setDisable(false);
          console.error("Error uploading file:", error);
        }
      }
    };
    fileReader.readAsDataURL(file);
  };

  console.log(form.formState.errors);

  const onSubmit = async (data: z.infer<typeof OnboardingValidation>) => {
    console.log(data);
    setLoading(true);
    const result = await updateUser({
      firstName: data.firstName,
      lastName: data.lastName,
      middleName: data.middleName,
      streetAddress: data.streetAddress,
      city: data.city,
      country: data.country,
      image: data.image,
      professionalDesignation: data.professionalDesignation,
    });
    setLoading(false);
    if (result) router.push("/auth/verify");
  };

  return (
    <div className="text-white">
      <div className="mt-[30px] pb-5">
        <p className="text-center text-2xl font-bold">
          Complete your profile to continue
        </p>
        <div className="pt-[3rem] px-[2rem]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7 justify-center">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-medium text-[20px]">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-medium text-[20px]">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="middleName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-medium text-[20px]">
                        Other Names
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Floyd" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="professionalDesignation"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-medium text-[20px]">
                        Professional Designation
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Director" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="streetAddress"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-medium text-[20px]">
                        Street Address
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="No. 123, ABC Street" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-medium text-[20px]">
                        City
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="London" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-medium text-[20px]">
                        Country
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="United Kingdom" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormLabel className="account-form_image-label">
                        {field.value ? (
                          <Image
                            src={field.value}
                            alt="image"
                            width={96}
                            height={96}
                            priority
                            className="rounded-full aspect-square object-cover"
                          />
                        ) : (
                          <Image
                            src="/assets/icons/avatar.png"
                            alt="image"
                            width={96}
                            height={96}
                            className="rounded-full aspect-square object-cover"
                          />
                        )}
                      </FormLabel>
                      <label
                        htmlFor="image"
                        className="text-white cursor-pointer text-[20px] font-medium"
                      >
                        Upload Profile Picture
                      </label>
                      <FormControl className="flex-1 text-base-semibold text-gray-200">
                        <Input
                          type="file"
                          accept="image/*"
                          ref={inputFileRef}
                          placeholder="Upload Profile Photo"
                          className="hidden"
                          onChange={(e) => handleImage(e, field.onChange)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="text-center">
                <NoOutlineButtonBig
                  type="submit"
                  name="Save and Continue"
                  disabled={disable}
                  loading={loading}
                />
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

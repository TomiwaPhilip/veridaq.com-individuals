"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form/form";
import { Input } from "@/components/form/input";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useState, ChangeEvent, useRef } from "react";
import { upload } from "@vercel/blob/client";

import { BlackButton } from "@/components/shared/buttons";
import { OnboardingValidation } from "@/lib/validations/onboarding";
import { updateUser } from "@/lib/actions/onboarding.action";
import { StatusMessage } from "@/components/shared/shared";

export interface SettingsProps {
  firstName: string;
  lastName: string;
  middleName: string;
  streetAddress: string;
  city: string;
  country: string;
  image: string;
  professionalDesignation: string;
}

export default function Settings(params: SettingsProps) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const form = useForm<z.infer<typeof OnboardingValidation>>({
    resolver: zodResolver(OnboardingValidation),
    defaultValues: {
      firstName: params.firstName,
      lastName: params.lastName,
      middleName: params.middleName,
      streetAddress: params.streetAddress,
      city: params.city,
      country: params.country,
      image: params.image,
      professionalDesignation: params.professionalDesignation,
    },
  });

  const handleImage = async (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void,
  ) => {
    e.preventDefault();
    console.log("I touched here");

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
          setDisable(false);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }
    };
    fileReader.readAsDataURL(file);
  };

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
    if (result) {
      setIsSuccessful(true);
    } else {
      setIsError(true);
    }
    setDisable(false);
    setLoading(false);
  };

  return (
    <div className="text-[#38313A] mb-[5rem] sm:mb-[0rem]">
      <div className="mt-[30px]">
        <p className="text-2xl font-bold mb-5">Veridaq Account Details</p>
        <div className="">
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
                        Lastname
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
                      <FormControl className="flex-1 text-base-semibold text-gray-200">
                        <Input
                          type="file"
                          accept="image/*"
                          ref={inputFileRef}
                          placeholder="Upload Profile Photo"
                          className="account-form_image-input"
                          onChange={(e) => handleImage(e, field.onChange)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="">
                  <BlackButton
                    type="submit"
                    name="Save Changes"
                    disabled={disable}
                    loading={loading}
                  />
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
      {isError ? (
        <StatusMessage message="An Error occurred!" type="error" />
      ) : null}
      {isSuccessful ? (
        <StatusMessage message="Saved Successfully!" type="success" />
      ) : null}
    </div>
  );
}

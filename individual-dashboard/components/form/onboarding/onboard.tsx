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
import { Input } from "@/components/form/input";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useState, ChangeEvent, useRef } from 'react';
import { updateUser } from "@/lib/actions/onboarding.action";
import { upload } from '@vercel/blob/client';

  
import { NoOutlineButtonBig } from "@/components/shared/buttons";
import { OnboardingValidation } from "@/lib/validations/onboarding";

export default function Onboard(){

    const router = useRouter();
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [disable, setDisable] = useState(true)

    const form = useForm<z.infer<typeof OnboardingValidation>>({
        resolver: zodResolver(OnboardingValidation),
        defaultValues: {
          firstName: "",
          lastName: "",
          middleName: "",
          streetAddress: "",
          city: "",
          country: "",
          image: "",
        },
      });
      
      const handleImage = async (
        e: ChangeEvent<HTMLInputElement>,
        fieldChange: (value: string) => void,
      ) => {
        e.preventDefault();
      
        const fileReader = new FileReader();
        if (!inputFileRef.current?.files) {
          throw new Error('No file selected');
        }
        
        const file = inputFileRef.current.files[0];
        
        fileReader.onload = async (e) => {
          const fileData = e.target?.result;
          if (typeof fileData === 'string') {
            try {
              const newBlob = await upload(file.name, file, {
                access: 'public',
                handleUploadUrl: '/api/avatar/upload',
              });
              
              // Update the form data with the new blob URL
              fieldChange(newBlob.url);
              setDisable(false);
            } catch (error) {
              console.error('Error uploading file:', error);
            }
          }
        };
        fileReader.readAsDataURL(file);

      };


      const onSubmit = async (data: z.infer<typeof OnboardingValidation>) => {
        console.log(data);
        await updateUser({
          firstName: data.firstName,
          lastName: data.lastName,
          middleName: data.middleName,
          streetAddress: data.streetAddress,
          city: data.city,
          country: data.country,
          image: data.image,
        });
        router.push("/auth/verify");
      };

    return (
        <div className="text-white">
      <div className="mt-[30px] pb-5">
        <p className="text-center text-2xl font-bold">
          Complete your profile to continue
        </p>
        <div className="pt-[3rem] px-[10rem]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex gap-[6.5rem] space-10 items-center justify-center">
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
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-[6.5rem] space-10 items-center justify-center">
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
              </div>
              <div className="flex gap-[6.5rem] space-10 items-center justify-center">
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
              </div>
              <div className="flex gap-[6.5rem] space-10">
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
                            className="rounded-full object-contain"
                          />
                        ) : (
                          <Image
                            src="/assets/icons/avatar.png"
                            alt="image"
                            width={96}
                            height={96}
                            className="object-contain"
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
              </div>
              <div className="text-center">
                <NoOutlineButtonBig type="submit" name="Save and Continue" disabled={disable} />
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
    )
}
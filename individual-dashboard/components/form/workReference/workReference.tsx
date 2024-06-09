"use client";

import React, { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { format } from "date-fns";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Input } from "@/components/form/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  createWorkReferenceRequest,
  createWorkReferenceRequestForAdmin,
} from "@/lib/actions/request.action";
import {
  WorkReferenceValidation,
  WorkReferenceValidation2,
} from "@/lib/validations/workreference";
import {
  SuccessMessage,
  ErrorMessage,
  StatusMessage,
  useSession,
} from "@/components/shared/shared";
import { getOrganizations } from "@/lib/actions/request.action";
import { convertStringToNumber } from "@/lib/actions/payments.action";
import { BlackButton } from "@/components/shared/buttons";

const WorkReference: React.FC = () => {
  interface Organization {
    _id: string;
    name: string;
    studentshipStatusFee?: number;
    docVerificationFee?: number;
    membershipRefFee?: number;
  }

  const [step, setStep] = useState(1);
  const [formType, setFormType] = useState("withOrg");
  const [requestResult, setRequestResult] = useState<boolean | null>(null);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const session = useSession();
  const [isDisabled, setIsDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [fee, setFee] = useState<number | null>(null);

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const orgs = await getOrganizations();
        setOrganizations(orgs);
      } catch (error) {
        console.error("Error fetching organizations:", error);
        // Handle error state if needed
      }
    };

    fetchOrgs();
  }, []);

  async function checkbalance(fee?: number) {
    console.log(fee);
    const convertedBalance = await convertStringToNumber(
      session?.walletBalance as string,
    );
    if (convertedBalance === fee) {
      return;
    } else {
      setFee(fee as number);
      setError(true);
      setIsDisabled(true);
    }
    // Reset error state after 10 seconds (adjust as needed)
    setTimeout(() => {
      setError(false);
    }, 10000); // 10000 milliseconds = 10 seconds
    console.log("I was clicked", error);
  }

  async function checkbalance2() {
    const fee = 3000;

    const convertedBalance = await convertStringToNumber(
      session?.walletBalance as string,
    );
    if (convertedBalance === fee) {
      return;
    } else {
      setFee(fee as number);
      setError(true);
      setIsDisabled(true);
    }
    // Reset error state after 10 seconds (adjust as needed)
    setTimeout(() => {
      setError(false);
    }, 10000); // 10000 milliseconds = 10 seconds
    console.log("I was clicked", error);
  }

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleFormType = () => {
    // checkbalance2();
    setFormType("withOutOrg");
  };

  const form = useForm<z.infer<typeof WorkReferenceValidation>>({
    resolver: zodResolver(WorkReferenceValidation),
  });

  const form2 = useForm<z.infer<typeof WorkReferenceValidation2>>({
    resolver: zodResolver(WorkReferenceValidation2),
  });

  console.log(form.formState.errors);
  console.log(form2.formState.errors);

  const onSubmit = async (data: z.infer<typeof WorkReferenceValidation>) => {
    console.log("I want to submit");
    setLoading(true);
    try {
      const create = await createWorkReferenceRequest({
        orgId: data.orgId,
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        employeeType: data.employeeType,
        subType: data.subType,
        staffId: data.staffId,
        designation: data.designation,
        workStartDate: data.workStartDate,
        workEndDate: data.workEndDate,
        department: data.department,
        notableAchievement: data.notableAchievement,
        jobFunction: data.jobFunction,
        personalitySummary: data.personalitySummary,
      });
      setRequestResult(create);
      if (create) {
        handleNextStep();
        setLoading(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setRequestResult(false);
      setLoading(false);
    }
  };

  const onSubmit2 = async (data: z.infer<typeof WorkReferenceValidation2>) => {
    console.log("I want to submit");
    setLoading(true);
    try {
      const create = await createWorkReferenceRequestForAdmin(data);
      setRequestResult(create);
      if (create) {
        handleNextStep();
        setLoading(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setRequestResult(false);
      setLoading(false);
    }
  };

  return (
    <main>
      {formType === "withOrg" && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {step === 1 && (
              <div>
                <div className="mt-5 p-8">
                  <FormField
                    control={form.control}
                    name="orgId"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="font-medium text-[16px]">
                          Name of Organization
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "flex h-12 w-full normal-border bg-[#C3B8D8] pt-10 rounded-lg px-3 py-3 text-left",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value
                                  ? organizations.find(
                                      (organization) =>
                                        organization._id === field.value,
                                    )?.name
                                  : "Select Organization"}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput
                                placeholder="Search Organization..."
                                className="h-9"
                              />
                              <CommandEmpty>
                                No Organization found.
                              </CommandEmpty>
                              <CommandGroup>
                                {organizations.map((organization) => (
                                  <CommandItem
                                    value={organization.name}
                                    key={organization._id}
                                    onSelect={() => {
                                      form.setValue("orgId", organization._id);
                                      // checkbalance(
                                      //   organization.studentshipStatusFee,
                                      // );
                                    }}
                                  >
                                    {organization.name}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        organization._id === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="mt-10 flex flex-col w-full gap-5 md:flex-row">
                    <button
                      type="button"
                      className="bg-[#38313A] px-4 py-4 rounded-md text-white"
                      onClick={handleNextStep}
                      disabled={isDisabled}
                    >
                      Continue
                    </button>
                    <button
                      type="button"
                      className="border border-[#38313A] px-4 py-4 rounded-md text-[#38313A]"
                      onClick={handleFormType}
                    >
                      My Organization is not here
                    </button>
                  </div>
                </div>
                <p className="p-2">{`Step ${step}`}</p>
              </div>
            )}
            {step === 2 && (
              <div>
                <div className="mt-4 w-full px-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="font-medium text-[16px]">
                            Firstname
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
                          <FormLabel className="font-medium text-[16px]">
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
                          <FormLabel className="font-medium text-[16px]">
                            Middle Name
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Fred" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="employeeType"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-medium text-[16px]">
                            Employee Type
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a Employee Type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Regular">Regular</SelectItem>
                              <SelectItem value="Non-Regular">
                                Non-Regular e.g. Adhoc
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subType"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-medium text-[16px]">
                            Sub Type
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a Sub Type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Current">Current</SelectItem>
                              <SelectItem value="Former">Former</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="staffId"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-medium text-[16px]">
                            Staff ID
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="D11234" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="designation"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-medium text-[16px]">
                            Designation
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Snr." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-5 grid grid-cols-2 items-center justify-center">
                    <div className="text-left left">
                      <button
                        type="button"
                        className="mr-auto md:mr-0"
                        onClick={handlePrevStep}
                      >
                        Previous
                      </button>
                    </div>
                    <div className="text-right right">
                      <button
                        type="button"
                        className="bg-[#38313A] px-7 py-5 rounded-md text-white"
                        onClick={handleNextStep}
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
                <p className="p-2">{`Step ${step}`}</p>
              </div>
            )}
            {step === 3 && (
              <div>
                <div className="mt-4 w-full px-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
                    <FormField
                      control={form.control}
                      name="workStartDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="font-medium text-[16px]">
                            Work Start Date
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "flex h-12 w-full normal-border bg-[#C3B8D8] pt-10 rounded-lg px-1 py-3 placeholder:text-gray-500 text-left disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-950",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="workEndDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="font-medium text-[16px]">
                            Work End Date (Leave blank if ongoing)
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "flex h-12 w-full normal-border bg-[#C3B8D8] pt-10 rounded-lg px-1 py-3 placeholder:text-gray-500 text-left disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-950",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-medium text-[16px]">
                            Current/Last Department
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Department" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="notableAchievement"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Notable Achievement</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Notable Achievement"
                              id="notableAchievement"
                              className="flex h-12 w-full normal-border bg-[#C3B8D8] pt-10 rounded-lg px-1 py-3 placeholder:text-gray-500 text-left disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-950"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="jobFunction"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Job Function</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Job Function"
                              id="jobFunction"
                              className="flex h-12 w-full normal-border bg-[#C3B8D8] pt-10 rounded-lg px-1 py-3 placeholder:text-gray-500 text-left disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-950"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="personalitySummary"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Personality Summary</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Personality Summary"
                              id="personalitySummary"
                              className="flex h-12 w-full normal-border bg-[#C3B8D8] pt-10 rounded-lg px-1 py-3 placeholder:text-gray-500 text-left disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-950"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-5 grid grid-cols-2 items-center justify-center">
                    <div className="text-left left">
                      <button
                        type="button"
                        className="mr-auto md:mr-0"
                        onClick={handlePrevStep}
                      >
                        Previous
                      </button>
                    </div>
                    <div className="text-right right">
                      <BlackButton
                        name="Submit"
                        type="submit"
                        disabled={isDisabled}
                        loading={loading}
                      />
                    </div>
                  </div>
                </div>
                <p className="p-2">{`Step ${step}`}</p>
              </div>
            )}

            {step === 4 && (
              <div>
                {/* Render success or error component based on request result */}
                {requestResult === true && <SuccessMessage />}
                {requestResult === false && <ErrorMessage />}
              </div>
            )}
          </form>
        </Form>
      )}
      {formType === "withOutOrg" && (
        <Form {...form2}>
          <form onSubmit={form2.handleSubmit(onSubmit2)}>
            {step === 1 && (
              <div>
                <p className="text-xl px-8">Personal Details</p>
                <div className="mt-4 w-full px-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
                    <FormField
                      control={form2.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="font-medium text-[16px]">
                            Firstname
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form2.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-medium text-[16px]">
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
                      control={form2.control}
                      name="middleName"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-medium text-[16px]">
                            Middle Name
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Fred" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form2.control}
                      name="employeeType"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-medium text-[16px]">
                            Employee Type
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a Employee Type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Regular">Regular</SelectItem>
                              <SelectItem value="Non-Regular">
                                Non-Regular e.g. Adhoc
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form2.control}
                      name="subType"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-medium text-[16px]">
                            Sub Type
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a Sub Type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Current">Current</SelectItem>
                              <SelectItem value="Former">Former</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form2.control}
                      name="staffId"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-medium text-[16px]">
                            Staff ID
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="D11256" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form2.control}
                      name="designation"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-medium text-[16px]">
                            Designation
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Snr." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-5 flex items-center justify-center">
                    {/* <div className="text-left left">
                     <button type="button" className='mr-auto md:mr-0' onClick={handlePrevStep}>Previous</button>
                    </div> */}
                    <div className="text-right right">
                      <button
                        type="button"
                        className="bg-[#38313A] px-7 py-5 rounded-md text-white"
                        onClick={handleNextStep}
                        disabled={isDisabled}
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
                <p className="p-2">{`Step ${step}`}</p>
              </div>
            )}
            {step === 2 && (
              <div>
                <p className="text-xl px-8">Personal Details</p>
                <div className="mt-4 w-full px-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
                    <FormField
                      control={form2.control}
                      name="workStartDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="font-medium text-[16px]">
                            Work Start Date
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "flex h-12 w-full normal-border bg-[#C3B8D8] pt-10 rounded-lg px-1 py-3 placeholder:text-gray-500 text-left disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-950",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="workEndDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="font-medium text-[16px]">
                            Work End Date (Leave blank if ongoing)
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "flex h-12 w-full normal-border bg-[#C3B8D8] pt-10 rounded-lg px-1 py-3 placeholder:text-gray-500 text-left disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-950",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-medium text-[16px]">
                            Current/Last Department
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Department" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form2.control}
                      name="notableAchievement"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Notable Achievement</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Notable Achievement"
                              id="notableAchievement"
                              className="flex h-12 w-full normal-border bg-[#C3B8D8] pt-10 rounded-lg px-1 py-3 placeholder:text-gray-500 text-left disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-950"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form2.control}
                      name="jobFunction"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Job Function</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Job Function"
                              id="jobFunction"
                              className="flex h-12 w-full normal-border bg-[#C3B8D8] pt-10 rounded-lg px-1 py-3 placeholder:text-gray-500 text-left disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-950"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form2.control}
                      name="personalitySummary"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Personality Summary</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Personality Summary"
                              id="personalitySummary"
                              className="flex h-12 w-full normal-border bg-[#C3B8D8] pt-10 rounded-lg px-1 py-3 placeholder:text-gray-500 text-left disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-950"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-5 grid grid-cols-2 items-center justify-center">
                    <div className="text-left left">
                      <button
                        type="button"
                        className="mr-auto md:mr-0"
                        onClick={handlePrevStep}
                      >
                        Previous
                      </button>
                    </div>
                    <div className="text-right right">
                      <button
                        type="button"
                        className="bg-[#38313A] px-7 py-5 rounded-md text-white"
                        onClick={handleNextStep}
                        disabled={isDisabled}
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
                <p className="p-2">{`Step ${step}`}</p>
              </div>
            )}
            {step === 3 && (
              <div>
                <p className="text-xl px-8">Organization Details</p>
                <div className="mt-4 w-full px-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
                    <FormField
                      control={form2.control}
                      name="orgName"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-medium text-[16px]">
                            Name
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Organization Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form2.control}
                      name="orgAddress"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-medium text-[16px]">
                            Address
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form2.control}
                      name="orgPostalCode"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-medium text-[16px]">
                            Postal Code
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="123456" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form2.control}
                      name="orgCountry"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-medium text-[16px]">
                            Country
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Nigeria" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form2.control}
                      name="orgEmail"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-medium text-[16px]">
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="example@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form2.control}
                      name="orgPhone"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-medium text-[16px]">
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="+23481900000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-5 grid grid-cols-2 items-center justify-center">
                    <div className="text-left left">
                      <button
                        type="button"
                        className="mr-auto md:mr-0"
                        onClick={handlePrevStep}
                      >
                        Previous
                      </button>
                    </div>
                    <div className="text-right right">
                      <button
                        type="button"
                        className="bg-[#38313A] px-7 py-5 rounded-md text-white"
                        onClick={handleNextStep}
                        disabled={isDisabled}
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
                <p className="p-2">{`Step ${step}`}</p>
              </div>
            )}
            {step === 4 && (
              <div>
                <p className="text-xl px-8">Contact Person Details</p>
                <div className="mt-4 w-full px-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
                    <FormField
                      control={form2.control}
                      name="contactName"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-medium text-[16px]">
                            Name
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form2.control}
                      name="contactAddress"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-medium text-[16px]">
                            Address
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form2.control}
                      name="contactPostalCode"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-medium text-[16px]">
                            Postal Code
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="123456" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form2.control}
                      name="contactCountry"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-medium text-[16px]">
                            Country
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Nigeria" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form2.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-medium text-[16px]">
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="example@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form2.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="font-medium text-[16px]">
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="+23481900000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-5 grid grid-cols-2 items-center justify-center">
                    <div className="text-left left">
                      <button
                        type="button"
                        className="mr-auto md:mr-0"
                        onClick={handlePrevStep}
                      >
                        Previous
                      </button>
                    </div>
                    <div className="text-right right">
                      <BlackButton
                        name="Submit"
                        type="submit"
                        disabled={isDisabled}
                        loading={loading}
                      />
                    </div>
                  </div>
                </div>
                <p className="p-2">{`Step ${step}`}</p>
              </div>
            )}

            {step === 5 && (
              <div>
                {/* Render success or error component based on request result */}
                {requestResult === true && <SuccessMessage />}
                {requestResult === false && <ErrorMessage />}
              </div>
            )}
          </form>
        </Form>
      )}
      {error ? (
        <StatusMessage
          message={`Insufficient Wallet Balance: fund your account with N${fee} to intiate request!`}
          type="error"
        />
      ) : null}
    </main>
  );
};

export default WorkReference;

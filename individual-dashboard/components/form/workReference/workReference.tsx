import React, { useState } from 'react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/form/form";
import { Input } from "@/components/form/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { date, z } from "zod";
import { updateUser } from "@/lib/actions/onboarding.action"
import { WorkReferenceValidation } from '@/lib/validations/workreference';

interface WorkReferenceProps {
  onFormSubmit: () => void;
}

const WorkReference: React.FC<WorkReferenceProps> = ({ onFormSubmit }) => {
  const [step, setStep] = useState(1);

  const handleNextStep: () => void = () => {
    setStep(step + 1);
  };

  const handlePrevStep: () => void = () => {
    setStep(step - 1);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (step === 4) {
      // If it's the last step, submit the form
      onFormSubmit();
    } else {
      // Otherwise, move to the next step
      handleNextStep();
    }
  };

  const form = useForm<z.infer<typeof WorkReferenceValidation>>({
    resolver: zodResolver(WorkReferenceValidation),
    defaultValues: {
        orgId: "",
        firstName: "",
        lastName: "",
        middleName: "",
        employeeType: "",
        subType: "",
        staffId: "",
        designation: "",
        workStartDate: new Date,
        workEndDate: new Date,
        department: "",
        notableAchievement: "",
        function: "",
        personalitySummary: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof WorkReferenceValidation>) => {
    await updateUser({
      firstName: data.firstName,
      lastName: data.lastName,
      middleName: data.middleName,
      streetAddress: data.streetAddress,
      city: data.city,
      country: data.country,
      image: data.image,
    });
  };

  return (
    <main>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
            {step === 1 && (
              <div>
                <div className='mt-5 p-8'>
                    <FormField
                    control={form.control}
                    name="orgId"
                    render={({ field }) => (
                        <FormItem className="w-full">
                        <FormLabel className="font-medium text-[16px]">
                            Name of Organization
                        </FormLabel>
                        <FormControl>
                            <Input placeholder="Start typing" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <div className="mt-10">
                      <button type="button" className='bg-[#38313A] px-7 py-5 rounded-md text-white' onClick={handleNextStep}>Continue</button>
                    </div>
                    </div>
                    <p className='p-2'>{`Step ${step}`}</p>                
                </div>       
            )}
            {step === 2 && (
                <div>
                <div className='mt-4 w-full px-8'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 justify-center'>
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
                        <FormControl>
                            <Input placeholder="Permanent" {...field} />
                        </FormControl>
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
                        <FormControl>
                            <Input placeholder="John" {...field} />
                        </FormControl>
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
                            <Input placeholder="John" {...field} />
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
                            <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                <div className="mt-5 grid grid-cols-2 items-center justify-center">
                    <div className="text-left left">
                     <button type="button" className='mr-auto md:mr-0' onClick={handlePrevStep}>Previous</button>
                    </div>
                    <div className="text-right right">
                      <button type="button" className='bg-[#38313A] px-7 py-5 rounded-md text-white' onClick={handleNextStep}>Continue</button>
                    </div>
                </div>
                </div>             
                <p className='p-2'>{`Step ${step}`}</p>  
            </div>
            )}
            {step === 3 && (
              <div>
                <div className='mt-4 w-full px-8'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 justify-center'>
                    <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                        <FormLabel className="font-medium text-[16px]">
                            Work Start Date
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
                            Work End Date
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
                    name="department"
                    render={({ field }) => (
                        <FormItem className="w-full">
                        <FormLabel className="font-medium text-[16px]">
                            Department
                        </FormLabel>
                        <FormControl>
                            <Input placeholder="Nursing" {...field} />
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
                        <FormLabel className="font-medium text-[16px]">
                            Notable Achievement
                        </FormLabel>
                        <FormControl>
                            <Input placeholder="Permanent" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="function"
                    render={({ field }) => (
                        <FormItem className="w-full">
                        <FormLabel className="font-medium text-[16px]">
                            Function
                        </FormLabel>
                        <FormControl>
                            <Input placeholder="Function" {...field} />
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
                        <FormLabel className="font-medium text-[16px]">
                            Personality Summary
                        </FormLabel>
                        <FormControl>
                            <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                <div className="mt-5 grid grid-cols-2 items-center justify-center">
                    <div className="text-left left">
                     <button type="button" className='mr-auto md:mr-0' onClick={handlePrevStep}>Previous</button>
                    </div>
                    <div className="text-right right">
                      <button type="button" className='bg-[#38313A] px-7 py-5 rounded-md text-white' onClick={handleNextStep}>Continue</button>
                    </div>
                </div>
                </div>
                <p className='p-2'>{`Step ${step}`}</p>               
            </div>
            )}
            {step === 4 && (
                <div>
                <h2>Step 4</h2>
                <button type="button" onClick={handlePrevStep}>Previous</button>
                <button type="submit">Submit</button>
                </div>
            )}
            </form>
        </Form>
    </main>
  );
};

export default WorkReference;

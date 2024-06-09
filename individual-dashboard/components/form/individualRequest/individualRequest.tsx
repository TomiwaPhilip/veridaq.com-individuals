"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Input } from "@/components/form/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  createIndividualRequest,
  generateIndividualRequest,
  getIndividualReferenceById,
} from "@/lib/actions/request.action";
import { IndividualRequestValidation } from "@/lib/validations/individualrequest";
import {
  SuccessMessage,
  ErrorMessage,
  useSession,
} from "@/components/shared/shared";
import { BlackButton } from "@/components/shared/buttons";

interface IndividualRequestProps {
  docId?: string | null;
}

const IndividualRequest: React.FC<IndividualRequestProps> = ({ docId }) => {
  const [step, setStep] = useState(1);
  const [requestResult, setRequestResult] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState(false);
  const session = useSession();

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const form = useForm<z.infer<typeof IndividualRequestValidation>>({
    resolver: zodResolver(IndividualRequestValidation),
  });

  console.log(form.formState.errors);

  useEffect(() => {
    const fetchIndividualReferenceDoc = async () => {
      if (!docId) return;
      try {
        const doc = await getIndividualReferenceById(docId);
        console.log("Fetched document:", doc); // Log fetched document
        // Set default values for form fields if available
        if (doc) {
          const {
            email,
            typeOfRequest,
            addresseeFullName,
            relationship,
            yearsOfRelationship,
            personalityReview,
            recommendationStatement,
          } = doc;
          form.reset({
            email,
            typeOfRequest,
            addresseeFullName,
            relationship,
            yearsOfRelationship,
            personalityReview,
            recommendationStatement,
          });
          console.log(session?.email);
          console.log(email);
          if (session?.email === email) {
            setDescription(true);
            console.log(session?.email);
            console.log(email);
          }
        }
      } catch (error) {
        console.error("Error fetching organizations:", error);
        // Handle error state if needed
      }
    };

    fetchIndividualReferenceDoc();
  }, [docId]);

  const onSubmit = async (
    data: z.infer<typeof IndividualRequestValidation>,
  ) => {
    console.log("I want to submit");
    setLoading(true);
    try {
      let create: boolean;
      if (!docId) {
        create = await createIndividualRequest({
          email: data.email,
          typeOfRequest: data.typeOfRequest,
          addresseeFullName: data.addresseeFullName,
          relationship: data.relationship,
          yearsOfRelationship: data.yearsOfRelationship,
          personalityReview: data.personalityReview,
          recommendationStatement: data.recommendationStatement,
          id: docId as string,
        });
      } else {
        create = await generateIndividualRequest({
          email: data.email,
          typeOfRequest: data.typeOfRequest,
          addresseeFullName: data.addresseeFullName,
          relationship: data.relationship,
          yearsOfRelationship: data.yearsOfRelationship,
          personalityReview: data.personalityReview,
          recommendationStatement: data.recommendationStatement,
          id: docId as string,
        });
      }

      if (create) {
        setRequestResult(create);
        handleNextStep();
        setLoading(false);
      } else {
        setRequestResult(create);
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {step === 1 && (
            <div>
              <div className="mt-5 p-8">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-medium text-[16px]">
                        Issuer Email Address on Veridaq
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Start typing" {...field} />
                      </FormControl>
                      {description && (
                        <FormDescription className="text-red-500 font-semibold">
                          Please review this form properly before issuing the
                          Veridaq. Any misinformation may lead to serious legal
                          complications.
                        </FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="mt-10 grid grid-cols-2 gap-10">
                  <button
                    type="button"
                    className="bg-[#38313A] px-7 py-5 rounded-md text-white"
                    onClick={handleNextStep}
                  >
                    Continue
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
                    name="typeOfRequest"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-medium text-[16px]">
                          Request Type
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Request Type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="reference">Reference</SelectItem>
                            <SelectItem value="recommendation">
                              Recommendation
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="addresseeFullName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-medium text-[16px]">
                          Addressee Full Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="relationship"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-medium text-[16px]">
                          Relationship
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Father" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="yearsOfRelationship"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="font-medium text-[16px]">
                          Years of Relationship
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
                          <PopoverContent className="w-auto p-0" align="start">
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
                    name="personalityReview"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Personality Review</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Personality Review"
                            id="personalityReview"
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
                    name="recommendationStatement"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Recommendation</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Recommendation"
                            id="recommendationStatement"
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
                      loading={loading}
                    />
                  </div>
                </div>
              </div>
              <p className="p-2">{`Step ${step}`}</p>
            </div>
          )}
          {step === 3 && (
            <div>
              {/* Render success or error component based on request result */}
              {requestResult === true && <SuccessMessage />}
              {requestResult === false && <ErrorMessage />}
            </div>
          )}
        </form>
      </Form>
    </main>
  );
};

export default IndividualRequest;

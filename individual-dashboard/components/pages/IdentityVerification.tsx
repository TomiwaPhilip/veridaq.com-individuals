"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../form/form";
import { Input } from "../form/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { VerificationValidation } from "@/lib/validations/onboarding";
import { z } from "zod";
import { updateVerification } from "@/lib/actions/onboarding.action";
import { NoOutlineButtonBig } from "../shared/buttons";

export default function IdentityVerification() {

    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof VerificationValidation>>({
        resolver: zodResolver(VerificationValidation),
    });

    const onSubmit = async (data: z.infer<typeof VerificationValidation>) => {
        console.log(data);
        setLoading(true);
        const result = await updateVerification();
        setLoading(false);
        if (result) router.push("/");
    };

    return (
        <div className="text-white mx-[30px] pb-5 flex-col items-center justify-center min-h-screen">
            <p className="text-center text-2xl font-bold pt-[10rem]">
                Fill in your National Identity Number
            </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="nin"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="font-medium text-[20px]">
                                    National Identity Number
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="09867543123458" {...field} />
                                </FormControl>
                                <FormMessage />
                                <FormDescription className="text-sm">
                                    If your NIN is confirmed to be falsified, you will lose your verification.
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                    <div className="text-center">
                        <NoOutlineButtonBig
                            type="submit"
                            name="Save and Continue"
                            disabled={disabled}
                            loading={loading}
                        />
                    </div>
                </form>
            </Form>
        </div>
    )
}
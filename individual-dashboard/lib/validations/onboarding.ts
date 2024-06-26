import { z } from "zod";

export const OnboardingValidation = z.object({
  firstName: z.string().min(1, {
    message: "Firstname must be at least 1 character.",
  }),
  lastName: z.string().min(1, {
    message: "Lastname must be at least 1 character.",
  }),
  middleName: z.string().min(1, {
    message: "Lastname must be at least 1 character.",
  }),
  professionalDesignation: z.string().min(1, {
    message: "Professional Designation must be at least 1 characters.",
  }),
  streetAddress: z.string().min(8, {
    message: "Street Address must be at least 8 characters.",
  }),
  city: z.string().min(1, {
    message: "City must be at least 1 characters.",
  }),
  country: z.string().min(1, {
    message: "Country must be at least 1 characters.",
  }),
  image: z.string().url().optional(),
});


export const VerificationValidation = z.object({
  nin: z.string().min(1, {
    message: "NIN must be at least 1 character.",
  })
})
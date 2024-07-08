import { z } from "zod";

export const IndividualRequestValidation = z.object({
  email: z.string().min(1, {
    message: "Email must be at least 1 character.",
  }),
  typeOfRequest: z.string().min(1, {
    message: "Type of Request must be at least 1 character.",
  }),
  addresseeFullName: z.string().optional(),
  relationship: z.string().min(1, {
    message: "Document Type must be at least 1 characters.",
  }),
  yearsOfRelationship: z.date().max(new Date(), {
    message: "Years of Relationship must be a valid date in the past.",
}),
  personalityReview: z.string().max(84, {
    message: "Personality Review must be at most 90 characters.",
  }),
  recommendationStatement: z.string().min(40, {
    message: "Recommendation Statement must be at least 40 characters.",
  }).max(294, "Recommendation Statement must be at most 300 characters"),
});

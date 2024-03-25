import { z } from "zod";

export const WorkReferenceValidation = z.object({
  orgId: z.string().min(1, {
    message: "Organization ID must be at least 1 character.",
  }),
  firstName: z.string().min(1, {
    message: "Last Name must be at least 1 character.",
  }),
  lastName: z.string().min(1, {
    message: "Last Name must be at least 1 character.",
  }),
  middleName: z.string().optional(), // Allow empty string
  employeeType: z.string().min(8, {
    message: "Employee Type must be at least 8 characters.",
  }),
  subType: z.string().min(1, {
    message: "Sub Type must be at least 1 character.",
  }),
  staffId: z.string().min(1, {
    message: "Staff ID must be at least 1 character.",
  }),
  designation: z.string().min(1, {
    message: "Designation must be at least 1 character.",
  }),
  workStartDate: z.date().min(new Date(), {
    message: "Work Start Date must be a valid date in the future.",
  }),
  workEndDate: z.date().nullable().refine((endDate: Date | null) => {
    if (endDate === null) return true; // Allow null for no end date
    if (!(endDate instanceof Date)) return false;
  }, {
    message: "Work End Date must be after Work Start Date or leave empty.",
    path: ["workEndDate"],
  }),  
  department: z.string().min(1, {
    message: "Department must be at least 1 character.",
  }),
  notableAchievement: z.string().optional(), // Allow empty string
  function: z.string().min(1, {
    message: "Function must be at least 1 character.",
  }),
  personalitySummary: z.string().optional(), // Allow empty string
});

"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDB from "../model/database";
import WorkReference from "../utils/workreference";
import User from "../utils/user";

interface Params {
  orgId: string;
  firstName: string;
  lastName: string;
  middleName?: string; // Optional middleName field
  employeeType: string;
  subType: string;
  staffId: string;
  designation: string;
  workStartDate: string;
  workEndDate: string | null; // Nullable workEndDate field
  department: string;
  notableAchievement?: string; // Optional notableAchievement field
  jobFunction: string; // Renamed from 'function' to 'jobFunction'
  personalitySummary?: string; // Optional personalitySummary field
}

export async function createWorkReferenceRequest({
  orgId,
  firstName,
  lastName,
  middleName,
  employeeType,
  subType,
  staffId,
  designation,
  workStartDate,
  workEndDate,
  department,
  notableAchievement,
  jobFunction, // Changed from 'function' to 'jobFunction'
  personalitySummary,
}: Params) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      throw new Error("Unauthorized");
    }

    // Connect to the database
    connectToDB();

    // Find the user in the User collection by email
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      throw new Error("User not found");
    }

    // Create a new WorkReference document
    const workReference = new WorkReference({
      orgId,
      firstName,
      lastName,
      middleName,
      employeeType,
      subType,
      staffId,
      designation,
      workStartDate,
      workEndDate,
      department,
      notableAchievement,
      jobFunction, // Changed from 'function' to 'jobFunction'
      personalitySummary,
      user: user._id,
    });

    // Save the WorkReference document to the database
    await workReference.save();
    return true;
  } catch (error: any) {
    throw new Error(`Failed to save WorkReference request: ${error.message}`);
  }
}

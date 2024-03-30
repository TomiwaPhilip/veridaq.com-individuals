"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDB from "../model/database";
import WorkReference from "../utils/workreference";
import WorkReferenceAdmin from "../utils/workreferenceadmin";
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
  workStartDate: Date;
  workEndDate: Date | undefined; // Nullable workEndDate field
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


interface Params2 {
  firstName: string;
  lastName: string;
  middleName?: string; // Optional middleName field
  employeeType: string;
  subType: string;
  staffId: string;
  designation: string;
  workStartDate: Date;
  workEndDate?: Date; // Nullable workEndDate field
  department: string;
  notableAchievement?: string; // Optional notableAchievement field
  jobFunction: string; // Renamed from 'function' to 'jobFunction'
  personalitySummary?: string; // Optional personalitySummary field
  orgName: string;
  orgAddress: string;
  orgPostalCode: string;
  orgCountry: string;
  orgEmail: string;
  orgPhone: string;
  contactName: string;
  contactAddress: string;
  contactPostalCode: string;
  contactCountry: string;
  contactEmail: string;
  contactPhone: string;
}

export async function createWorkReferenceRequestForAdmin(params: Params2) {
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
    const workReference = new WorkReferenceAdmin({
      ...params,
      user: user._id,
    });

    // Save the WorkReference document to the database
    await workReference.save();
    return true;
  } catch (error: any) {
    throw new Error(`Failed to save WorkReference request: ${error.message}`);
  }
}

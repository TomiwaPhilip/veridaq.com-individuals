"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDB from "../model/database";
import WorkReference from "../utils/workreference";
import WorkReferenceAdmin from "../utils/workreferenceadmin";
import StudentshipStatus from "../utils/studentshipstatus";
import StudentshipStatusAdmin from "../utils/studentshipstatusadmin";
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

interface StudentshipParams {
  orgId: string;
  firstName: string;
  lastName: string;
  middleName?: string; // Optional middleName field
  currentLevel: string;
  courseOfStudy: string;
  studentId: string;
  info?: string; // Optional info field
  faculty: string;
  entryYear: Date;
  exitYear?: Date; // Optional exitYear field
  image: string;
}

// Define the createStudentshipStatus function
export async function createStudentshipStatus(params: StudentshipParams) {
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

    // Create a new StudentshipStatus document
    const studentshipStatus = new StudentshipStatus({
      orgId: params.orgId,
      firstName: params.firstName,
      lastName: params.lastName,
      middleName: params.middleName,
      currentLevel: params.currentLevel,
      courseOfStudy: params.courseOfStudy,
      studentId: params.studentId,
      info: params.info,
      faculty: params.faculty,
      entryYear: params.entryYear,
      exitYear: params.exitYear,
      image: params.image,
      user: user._id,
    });

    // Save the StudentshipStatus document to the database
    await studentshipStatus.save();
    return true;
  } catch (error: any) {
    throw new Error(`Failed to save StudentshipStatus request: ${error.message}`);
  }
}


interface StudentshipParamsAdmin {
  firstName: string;
  lastName: string;
  middleName?: string; // Optional middleName field
  currentLevel: string;
  courseOfStudy: string;
  studentId: string;
  info?: string; // Optional info field
  faculty: string;
  entryYear: Date;
  exitYear?: Date; // Optional exitYear field
  image: string;
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

export async function createStudentshipStatusForAdmin(params: StudentshipParamsAdmin) {
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

    // Create a new StudentshipStatus2 document
    const studentshipStatusAdmin = new StudentshipStatusAdmin({
      firstName: params.firstName,
      lastName: params.lastName,
      middleName: params.middleName,
      currentLevel: params.currentLevel,
      courseOfStudy: params.courseOfStudy,
      studentId: params.studentId,
      info: params.info,
      faculty: params.faculty,
      entryYear: params.entryYear,
      exitYear: params.exitYear,
      image: params.image,
      orgName: params.orgName,
      orgAddress: params.orgAddress,
      orgPostalCode: params.orgPostalCode,
      orgCountry: params.orgCountry,
      orgEmail: params.orgEmail,
      orgPhone: params.orgPhone,
      contactName: params.contactName,
      contactAddress: params.contactAddress,
      contactPostalCode: params.contactPostalCode,
      contactCountry: params.contactCountry,
      contactEmail: params.contactEmail,
      contactPhone: params.contactPhone,
      user: user._id,
    });

    // Save the StudentshipStatus2 document to the database
    await studentshipStatusAdmin.save();
    return true;
  } catch (error: any) {
    throw new Error(`Failed to save StudentshipStatusAdmin request: ${error.message}`);
  }
}

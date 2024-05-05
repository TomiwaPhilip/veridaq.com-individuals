"use server";

import getSession from "@/lib/actions/server-hooks/getsession.action";
import connectToDB from "../model/database";
import WorkReference from "../utils/workreference";
import WorkReferenceAdmin from "../utils/workreferenceadmin";
import StudentshipStatus from "../utils/studentshipstatus";
import StudentshipStatusAdmin from "../utils/studentshipstatusadmin";
import MembershipReferenceAdmin from "../utils/membershipReferenceAdmin";
import DocumentVerification from "../utils/documentVerification";
import Organization from "../utils/organizationSchema";
import DocumentVerificationAdmin from "../utils/documentVerificationAdmin";
import IndividualRequest from "../utils/individualRequest";
import User from "../utils/user";
import MembershipReference from "../utils/membershipReference";
import { findUserByEmail } from "./server-hooks/hooks.action";
import {
  generateVeridaqID,
  concatenateDates,
  getCurrentDateTime,
} from "../utils";
import { getDocAndUpload } from "./server-hooks/requestWithUpload.action";

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
    const session = await getSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    // Connect to the database
    connectToDB();

    // Find the user in the User collection by email
    const user = await findUserByEmail();

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
      dateRequested: new Date(),
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
    const session = await getSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    // Connect to the database
    connectToDB();

    // Find the user in the User collection by email
    const user = await findUserByEmail();

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
  categoryOfStudy: string;
  info?: string; // Optional info field
  faculty: string;
  entryYear: Date;
  exitYear?: Date; // Optional exitYear field
  image: string;
}

// Define the createStudentshipStatus function
export async function createStudentshipStatus(params: StudentshipParams) {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    // Connect to the database
    connectToDB();

    // Find the user in the User collection by email
    const user = await findUserByEmail();

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
      categoryOfStudy: params.categoryOfStudy,
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
    throw new Error(
      `Failed to save StudentshipStatus request: ${error.message}`,
    );
  }
}

interface StudentshipParamsAdmin {
  firstName: string;
  lastName: string;
  middleName?: string; // Optional middleName field
  currentLevel: string;
  courseOfStudy: string;
  studentId: string;
  categoryOfStudy: string;
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

export async function createStudentshipStatusForAdmin(
  params: StudentshipParamsAdmin,
) {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    // Connect to the database
    connectToDB();

    // Find the user in the User collection by email
    const user = await findUserByEmail();

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
      categoryOfStudy: params.categoryOfStudy,
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
    throw new Error(
      `Failed to save StudentshipStatusAdmin request: ${error.message}`,
    );
  }
}

interface MembershipParams {
  orgId: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  id: string;
  memberSince: Date;
  image?: string;
  alumniCategory?: string;
}

// Define the Membership Reference function
export async function createMembershipReference(params: MembershipParams) {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    // Connect to the database
    connectToDB();

    // Find the user in the User collection by email
    const user = await findUserByEmail();

    if (!user) {
      throw new Error("User not found");
    }

    // Create a new Memebership Reference document
    const membershipReference = new MembershipReference({
      orgId: params.orgId,
      firstName: params.firstName,
      lastName: params.lastName,
      middleName: params.middleName,
      id: params.id,
      memberSince: params.memberSince,
      alumniCategory: params.alumniCategory,
      image: params.image,
      user: user._id,
    });

    // Save the Memebership Reference document to the database
    await membershipReference.save();
    return true;
  } catch (error: any) {
    throw new Error(
      `Failed to save Membership Reference request: ${error.message}`,
    );
  }
}

// Define the interface for the parameters
interface MembershipParamsAdmin {
  firstName: string;
  lastName: string;
  middleName?: string;
  id: string;
  memberSince: Date;
  alumniCategory?: string;
  image?: string;
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

// Define the function to save membership reference data to the database
export async function createMembershipReferenceForAdmin(
  params: MembershipParamsAdmin,
) {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    // Connect to the database
    connectToDB();

    // Find the user in the User collection by email
    const user = await findUserByEmail();

    if (!user) {
      throw new Error("User not found");
    }

    // Create a new MembershipReferenceAdmin document
    const membershipReferenceAdmin = new MembershipReferenceAdmin({
      firstName: params.firstName,
      lastName: params.lastName,
      middleName: params.middleName,
      id: params.id,
      memberSince: params.memberSince,
      alumniCategory: params.alumniCategory,
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

    // Save the MembershipReferenceAdmin document to the database
    await membershipReferenceAdmin.save();
    return true;
  } catch (error: any) {
    throw new Error(
      `Failed to save MembershipReference request: ${error.message}`,
    );
  }
}

interface DocumentParams {
  orgId: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  id: string;
  info: string;
  image?: string;
}

// Define the createDocumentVerificationRequest function
export async function createDocumentVerificationRequest(
  params: DocumentParams,
) {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    // Connect to the database
    connectToDB();

    // Find the user in the User collection by email
    const user = await findUserByEmail();

    if (!user) {
      throw new Error("User not found");
    }

    // Create a new Document Verification document
    const documentVerification = new DocumentVerification({
      orgId: params.orgId,
      firstName: params.firstName,
      lastName: params.lastName,
      middleName: params.middleName,
      documentType: params.id, // Assuming id in MembershipParams corresponds to documentType
      documentName: params.info, // Assuming info in MembershipParams corresponds to documentName
      id: params.id,
      info: params.info,
      image: params.image, // Default to empty string if image is not provided
      user: user._id,
    });

    // Save the Document Verification document to the database
    await documentVerification.save();
    return true;
  } catch (error: any) {
    throw new Error(
      `Failed to save Document Verification request: ${error.message}`,
    );
  }
}

// Define the interface for MembershipParams
interface DocumentAdminParams {
  firstName: string;
  lastName: string;
  middleName?: string;
  documentType: string;
  documentName: string;
  id: string;
  info: string;
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

// Define the createDocumentVerificationRequestForAdmin function
export async function createDocumentVerificationRequestForAdmin(
  params: DocumentAdminParams,
) {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    // Connect to the database
    connectToDB();

    // Find the user in the User collection by email
    const user = await findUserByEmail();

    if (!user) {
      throw new Error("User not found");
    }

    // Create a new Document Verification Admin document
    const documentVerificationAdmin = new DocumentVerificationAdmin({
      firstName: params.firstName,
      lastName: params.lastName,
      middleName: params.middleName,
      documentType: params.documentType,
      documentName: params.documentName,
      id: params.id,
      info: params.info,
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

    // Save the Document Verification Admin document to the database
    await documentVerificationAdmin.save();
    return true;
  } catch (error: any) {
    throw new Error(
      `Failed to save Document Verification Admin request: ${error.message}`,
    );
  }
}

// Define the interface for the parameters based on the schema
interface IndividualParams {
  email: string;
  typeOfRequest: string;
  addresseeFullName?: string;
  relationship: string;
  yearsOfRelationship: Date;
  personalityReview: string;
  recommendationStatement: string;
  id?: string;
}

// Define the function to create an IndividualRequest document
export async function createIndividualRequest(params: IndividualParams) {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    // Connect to the database
    connectToDB();

    // Find the user in the User collection by email
    const user2 = await User.findOne({ email: params.email });

    // Create a new IndividualRequest document
    const individualRequest = new IndividualRequest({
      issuerUser: user2._id,
      email: params.email,
      typeOfRequest: params.typeOfRequest,
      addresseeFullName: params.addresseeFullName,
      relationship: params.relationship,
      yearsOfRelationship: params.yearsOfRelationship,
      personalityReview: params.personalityReview,
      recommendationStatement: params.recommendationStatement,
      user: session?.userId,
    });

    // Save the IndividualRequest document to the database
    await individualRequest.save();
    return true;
  } catch (error: any) {
    throw new Error(`Failed to save Individual Request: ${error.message}`);
  }
}

export async function generateIndividualRequest(params: IndividualParams) {
  try {
    // Connect to the database
    connectToDB();

    const session = await getSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    const issuerDesignation = session.professionalDesignation;
    const issuerName = (session.firstName + " " + session.lastName) as string;
    const period = concatenateDates(params.yearsOfRelationship);
    const currentDateTime = getCurrentDateTime();
    const badgeID = generateVeridaqID();

    console.log(params.id);

    let result;

    const data = {
      individualName: params.addresseeFullName,
      issuerName: issuerName,
      relationship: params.relationship,
      yearsOfRelationship: period,
      personalityReview: params.personalityReview,
      recommendationStatement: params.recommendationStatement,
      issuerDesignation: issuerDesignation,
      issuerContact: params.email,
      currentDateTime: currentDateTime,
      badgeID: badgeID,
    };
    const url =
      "https://silver-adventure-wr7r4g7g77jwcg7jp-5000.app.github.dev/individual-reference";
    const docName = "individualReference.pdf";

    result = await getDocAndUpload(data, url, docName);

    if (result) {
      // If id is provided, find and update the document
      await IndividualRequest.findByIdAndUpdate(
        params.id,
        {
          issued: true,
          dateIssued: new Date(),
          badgeUrl: result,
        },
        { new: true },
      );
      return true; // Return true if update is successful
    } else return false;
  } catch (error: any) {
    throw new Error(
      `Failed to generateIndividualRequest request: ${error.message}`,
    );
  }
}

interface Organization {
  _id: string; // Assuming _id is converted to string
  name: string;
  studentshipStatusFee?: number;
  docVerificationFee?: number;
  membershipRefFee?: number;
}

export async function getOrganizations(): Promise<Organization[]> {
  try {
    connectToDB();

    const organizations = await Organization.find(
      {},
      "name _id studentStatusFee docVerificationFee membershipRefFee",
    );
    console.log(organizations, "This is the organization from server");
    // Convert the _id field to a string
    const formattedOrganizations = organizations.map((org) => ({
      _id: org._id.toString(),
      name: org.name,
      studentshipStatusFee: org.studentStatusFee,
      docVerificationFee: org.docVerificationFee,
      membershipRefFee: org.membershipRefFee,
    }));

    console.log(
      formattedOrganizations,
      "this is the fomatted data from server",
    );

    return formattedOrganizations;
  } catch (error: any) {
    console.error(error);
    throw new Error("Error querying Database");
  }
}

// Function to reset hasAccessFee to false if accessFeePaymentDate is older than one year
const resetHasAccessFee = async () => {
  const now = new Date();
  // Calculate the date one year ago
  const oneYearAgo = new Date(
    now.getFullYear() - 1,
    now.getMonth(),
    now.getDate(),
  );
  try {
    // Find documents where accessFeePaymentDate is older than one year
    const documentsToUpdate = await User.find({
      hasAccessFee: true,
      accessFeePaymentDate: { $lt: oneYearAgo },
    });
    // Update hasAccessFee to false for those documents
    await User.updateMany(
      { _id: { $in: documentsToUpdate.map((doc) => doc._id) } },
      { $set: { hasAccessFee: false } },
    );
    console.log("hasAccessFee reset successfully.");
  } catch (error) {
    console.error("Error resetting hasAccessFee:", error);
  }
};

// Run the function every day to check for documents to reset
setInterval(resetHasAccessFee, 24 * 60 * 60 * 1000); // Run every 24 hours

// Helper function to format the date as "DD-MM-YYYY"
function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  return `${day}-${month}-${year}`;
}

export async function getIndividualReference() {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    // Connect to the database
    connectToDB();

    const userId = session.userId;

    // Query the WorkReference collection based on orgId
    const individualReferences = await IndividualRequest.find({
      userId,
      issued: false,
    }).select("addresseeFullName dateRequested");

    // Format the data before returning to the frontend
    const formattedData = individualReferences.map((doc) => ({
      DocDetails: `Individual Reference Veridaq Request from ${doc.addresseeFullName}`,
      DocId: doc._id.toString(), // Convert _id to string
      DocDate: formatDate(doc.dateRequested), // Format the date
    }));

    if (formattedData) return formattedData;
    false;
  } catch (error: any) {
    console.error(error);
    throw new Error("Failed to fetch Individual Reference documents");
  }
}

export async function getIndividualReferenceById(docId: string) {
  try {
    // Connect to the database
    connectToDB();

    // Query the WorkReference collection based on the provided docId
    const individualReference = await IndividualRequest.findById(docId);

    if (!individualReference) {
      throw new Error("Document not found");
    }

    // Convert the MongoDB _id field and other IDs to string
    const stringifiedIndividualReference = {
      ...individualReference.toJSON(),
      _id: individualReference._id.toString(), // Convert _id to string
      issuerUser: individualReference.orgId.toString(), // Convert orgId to string
      user: individualReference.user.toString(), // Convert user ID to string
    };

    // console.log(stringifiedWorkReference);

    return stringifiedIndividualReference;
  } catch (error: any) {
    console.error(error);
    throw new Error(
      `Failed to fetch individualReference document with ID: ${docId}`,
    );
  }
}

export async function getIssuedIndividualReference() {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    // Connect to the database
    connectToDB();

    const userId = session.userId;

    // Query the WorkReference collection based on orgId
    const individualRequest = await IndividualRequest.find({
      user: userId,
      issued: true,
    }).select("firstName lastName badgeUrl");

    // Format the data before returning to the frontend
    const formattedData = individualRequest.map((doc) => ({
      heading: `Individual Reference Veridaq to ${doc.firstName} ${doc.lastName}`,
      DocId: doc._id.toString(), // Convert _id to string
      link: doc.badgeUrl,
      textColor: "#38313A",
      bgColor: "#F26BBA",
      outlineColor: "#A593C5",
    }));

    if (formattedData) return formattedData;
    false;
  } catch (error: any) {
    console.error(error);
    throw new Error("Failed to fetch issued individualRequest documents");
  }
}

export async function getIssuedStudentshipStatus() {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    // Connect to the database
    connectToDB();

    const userId = session.userId;

    // Query the WorkReference collection based on orgId
    const studentshipStatus = await StudentshipStatus.find({
      user: userId,
      issued: true,
    }).select("firstName lastName badgeUrl");

    // Format the data before returning to the frontend
    const formattedData = studentshipStatus.map((doc) => ({
      heading: `Studentship Status Veridaq to ${doc.firstName} ${doc.lastName}`,
      DocId: doc._id.toString(), // Convert _id to string
      link: doc.badgeUrl,
      textColor: "#38313A",
      bgColor: "#F26BBA",
      outlineColor: "#A593C5",
    }));

    if (formattedData) return formattedData;
    false;
  } catch (error: any) {
    console.error(error);
    throw new Error("Failed to fetch issued studentshipStatus documents");
  }
}

export async function getIssuedDocVerification() {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    // Connect to the database
    connectToDB();

    const userId = session.userId;

    // Query the WorkReference collection based on orgId
    const docVerification = await DocumentVerification.find({
      user: userId,
      issued: true,
    }).select("firstName lastName badgeUrl");

    // Format the data before returning to the frontend
    const formattedData = docVerification.map((doc) => ({
      heading: `Document Verification Veridaq to ${doc.firstName} ${doc.lastName}`,
      DocId: doc._id.toString(), // Convert _id to string
      link: doc.badgeUrl,
      textColor: "#38313A",
      bgColor: "#AF8BA4",
      outlineColor: "#F4DBE4",
    }));

    if (formattedData) return formattedData;
    false;
  } catch (error: any) {
    console.error(error);
    throw new Error("Failed to fetch issued studentshipStatus documents");
  }
}

export async function getIssuedWorkReference() {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    // Connect to the database
    connectToDB();

    const userId = session.userId;

    // Query the WorkReference collection based on orgId
    const workReferences = await WorkReference.find({
      user: userId,
      issued: true,
    }).select("firstName lastName badgeUrl");

    // Format the data before returning to the frontend
    const formattedData = workReferences.map((doc) => ({
      heading: `Work Reference Veridaq to ${doc.firstName} ${doc.lastName}`,
      DocId: doc._id.toString(), // Convert _id to string
      link: doc.badgeUrl,
      textColor: "#38313A",
      bgColor: "#F4DBE4",
      outlineColor: "#897A8B",
    }));

    if (formattedData) return formattedData;
    false;
  } catch (error: any) {
    console.error(error);
    throw new Error("Failed to fetch issued WorkReference documents");
  }
}

export async function getIssuedMemberReference() {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    // Connect to the database
    connectToDB();

    const userId = session.userId;

    // Query the WorkReference collection based on orgId
    const memberReferences = await MembershipReference.find({
      user: userId,
      issued: true,
    }).select("firstName lastName badgeUrl");

    // Format the data before returning to the frontend
    const formattedData = memberReferences.map((doc) => ({
      heading: `Member Reference Veridaq to ${doc.firstName} ${doc.lastName}`,
      DocId: doc._id.toString(), // Convert _id to string
      link: doc.badgeUrl,
      textColor: "#FFFFFF",
      bgColor: "#38313A",
      outlineColor: "#C3B8D8",
    }));

    if (formattedData) return formattedData;
    false;
  } catch (error: any) {
    console.error(error);
    throw new Error("Failed to fetch issued memberReferences documents");
  }
}

export async function getIssuedAdminStudentshipStatus() {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    // Connect to the database
    connectToDB();

    const userId = session.userId;

    // Query the WorkReference collection based on orgId
    const studentshipStatus = await StudentshipStatusAdmin.find({
      user: userId,
      issued: true,
    }).select("firstName lastName badgeUrl");

    // Format the data before returning to the frontend
    const formattedData = studentshipStatus.map((doc) => ({
      heading: `Studentship Status Veridaq to ${doc.firstName} ${doc.lastName}`,
      DocId: doc._id.toString(), // Convert _id to string
      link: doc.badgeUrl,
      textColor: "#38313A",
      bgColor: "#F26BBA",
      outlineColor: "#A593C5",
    }));

    if (formattedData) return formattedData;
    false;
  } catch (error: any) {
    console.error(error);
    throw new Error("Failed to fetch issued studentshipStatus documents");
  }
}

export async function getIssuedAdminDocVerification() {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    // Connect to the database
    connectToDB();

    const userId = session.userId;

    // Query the WorkReference collection based on orgId
    const docVerification = await DocumentVerificationAdmin.find({
      user: userId,
      issued: true,
    }).select("firstName lastName badgeUrl");

    // Format the data before returning to the frontend
    const formattedData = docVerification.map((doc) => ({
      heading: `Document Verification Veridaq to ${doc.firstName} ${doc.lastName}`,
      DocId: doc._id.toString(), // Convert _id to string
      link: doc.badgeUrl,
      textColor: "#38313A",
      bgColor: "#AF8BA4",
      outlineColor: "#F4DBE4",
    }));

    if (formattedData) return formattedData;
    false;
  } catch (error: any) {
    console.error(error);
    throw new Error("Failed to fetch issued studentshipStatus documents");
  }
}

export async function getIssuedAdminWorkReference() {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    // Connect to the database
    connectToDB();

    const userId = session.userId;

    // Query the WorkReference collection based on orgId
    const workReferences = await WorkReferenceAdmin.find({
      user: userId,
      issued: true,
    }).select("firstName lastName badgeUrl");

    // Format the data before returning to the frontend
    const formattedData = workReferences.map((doc) => ({
      heading: `Work Reference Veridaq to ${doc.firstName} ${doc.lastName}`,
      DocId: doc._id.toString(), // Convert _id to string
      link: doc.badgeUrl,
      textColor: "#38313A",
      bgColor: "#F4DBE4",
      outlineColor: "#897A8B",
    }));

    if (formattedData) return formattedData;
    false;
  } catch (error: any) {
    console.error(error);
    throw new Error("Failed to fetch issued WorkReference documents");
  }
}

export async function getIssuedAdminMemberReference() {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    // Connect to the database
    connectToDB();

    const userId = session.userId;

    // Query the WorkReference collection based on orgId
    const memberReferences = await MembershipReferenceAdmin.find({
      user: userId,
      issued: true,
    }).select("firstName lastName badgeUrl");

    // Format the data before returning to the frontend
    const formattedData = memberReferences.map((doc) => ({
      heading: `Member Reference Veridaq to ${doc.firstName} ${doc.lastName}`,
      DocId: doc._id.toString(), // Convert _id to string
      link: doc.badgeUrl,
      textColor: "#FFFFFF",
      bgColor: "#38313A",
      outlineColor: "#C3B8D8",
    }));

    if (formattedData) return formattedData;
    false;
  } catch (error: any) {
    console.error(error);
    throw new Error("Failed to fetch issued memberReferences documents");
  }
}


export async function getVeridaqURL(badgeID: string): Promise<string | null> {
  console.log(badgeID)
  try {
    // Connect to the database
    connectToDB();

    // Define an array of collections to query
    const collections = [
      { collection: WorkReference, fieldName: 'badgeUrl' },
      { collection: StudentshipStatus, fieldName: 'badgeUrl' },
      { collection: MembershipReference, fieldName: 'badgeUrl' },
      { collection: DocumentVerification, fieldName: 'badgeUrl' },
      { collection: IndividualRequest, fieldName: 'badgeUrl' }
    ];

    // Iterate through the collections and query for the badgeUrl
    for (const { collection, fieldName } of collections) {
      const result = await collection.findOne({ badgeID: badgeID }).select(fieldName);
      if (result) {console.log(result); return result[fieldName];}
    }

    return null; // Return null if badgeUrl is not found in any collection
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch Veridaq URL");
  }
}
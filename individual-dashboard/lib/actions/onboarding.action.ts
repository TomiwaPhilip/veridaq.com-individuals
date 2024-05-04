"use server";

import getSession from "./server-hooks/getsession.action";
import { saveSession } from "../utils";

import connectToDB from "../model/database";
import User from "../utils/user";

interface Params {
  firstName: string;
  lastName: string;
  middleName: string;
  streetAddress: string;
  city: string;
  country: string;
  image: string;
  professionalDesignation: string;
}

export async function updateUser(params: Params) {
  try {
    console.log("At the server,", params);
    const session = await getSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    const userid = session.userId;

    // Connect to the database
    connectToDB();

    // Update the user in the database
    await User.findOneAndUpdate(
      { _id: userid },
      {
        firstname: params.firstName,
        lastname: params.lastName,
        middlename: params.middleName,
        professional_designation: params.professionalDesignation,
        street_address: params.streetAddress,
        city: params.city,
        country: params.country,
        image: params.image,
        onboarded: true,
      },
      // Upsert means both updating and inserting
      { upsert: true },
    );

    session.isOnboarded = true;
    session.image = params.image;
    session.firstName = params.firstName;
    session.lastName = params.lastName;
    await session.save();

    return true;
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export const dynamic = 'force-dynamic';

export async function getUserDetails() {
  try {
    const session = await getSession();
    // Connect To Db
    connectToDB();

    if(!session || session.userId) {
      throw new Error ("Unable to get session")
    }

    const userDetails = await User.findById(session?.userId, {
      firstname: 1,
      lastname: 1,
      middlename: 1,
      street_address: 1,
      city: 1,
      country: 1,
      image: 1,
      professional_designation: 1,
      _id: 0,
    });
    return userDetails;
  } catch (error) {
    console.error("Error querying DB for User details", error);
    throw new Error("Error querying DB for User details");
  }
}

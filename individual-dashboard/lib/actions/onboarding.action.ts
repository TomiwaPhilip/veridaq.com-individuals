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
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

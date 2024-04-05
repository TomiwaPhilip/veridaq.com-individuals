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
}

export async function updateUser({
  firstName,
  lastName,
  middleName,
  streetAddress,
  city,
  country,
  image,
}: Params) {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    const email = session.email;

    // Connect to the database
    connectToDB();

    // Update the user in the database
    await User.findOneAndUpdate(
      { email: email },
      {
        firstName,
        lastName,
        middleName,
        streetAddress,
        city,
        country,
        image,
        onboarded: true,
      },
      // Upsert means both updating and inserting
      { upsert: true },
    );

    session.isOnboarded = true;
    session.image = image;
    await session.save()
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

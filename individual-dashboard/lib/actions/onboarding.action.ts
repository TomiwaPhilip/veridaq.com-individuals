"use server"

import connectToDB from "../model/database";
import User from "../utils/user";
import { getSession } from 'next-auth/react';
import { NextApiRequest } from 'next';

interface Params {
    firstName: string,
    lastName: string,
    middleName: string,
    streetAddress: string,
    city: string,
    country: string,
    image: string,
}
  
export async function updateUser({
  req,
  firstName,
  lastName,
  middleName,
  streetAddress,
  city,
  country,
  image,
}: Params & { req?: NextApiRequest }): Promise<void> {
    try {
        // Retrieve session
        const session = await getSession({ req });
        if (!session || !session.user || !session.user.email) {
            throw new Error("User is not authenticated or email is missing in session.");
        }
        const email = session.user.email;

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
            { upsert: true }
        );
    } catch (error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`);
    }
}

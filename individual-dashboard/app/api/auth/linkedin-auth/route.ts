import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

import connectToDB from '@/lib/model/database';
import User from '@/lib/utils/user';
import { saveSession } from '@/lib/utils';
import { exchangeCodeForToken, getUserProfile } from '@/lib/actions/server-hooks/linkedin-auth.action';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      if(!req.url) {
        return new Response("No request query found!", { status: 401})
      }
      
      const urlSearchParams = new URLSearchParams(req.url.split('?')[1]);
      const code = urlSearchParams.get('code') as string;

      console.log(code);

      // Exchange authorization code for access token
      const accessToken = await exchangeCodeForToken(code);

      // Use access token to fetch user profile data
      const userProfile = await getUserProfile(accessToken);
      console.log(userProfile)

      try {
        // Connect to the database
        connectToDB();
          
        // Destructure the relevant properties from userInfo with optional chaining and nullish coalescing
        const { email, given_name, family_name, picture } = userProfile ?? {};
      
        // Check if the user already exists in the Role collection with the correct login type
              // Check if the user already exists in the User collection with the correct login type
      const existingUser = await User.findOne({ email: email });

      if (existingUser) {

        // Create session data
        let sessionData = {
          userId: existingUser._id,
          email: existingUser.email,
          firstName: existingUser.firstname,
          lastName: existingUser.lastname,
          image: existingUser.image, // Initialize image as an empty string
          isOnboarded: existingUser.onboarded,
          isVerified: existingUser.verified,
          isLoggedIn: true
        };

        if (existingUser.loginType === 'linkedin') {
          // User exists with the correct login type (Google), proceed with login
          console.log("User found with correct login type (Google), proceeding with login");

          // Save session
          await saveSession(sessionData);

          // Redirect to the dashboard or appropriate page
          return NextResponse.redirect(new URL('/dashboard', req.url));
        } else if (existingUser.loginType === "email") {
          // User exists with the correct login type (email), proceed with login
          console.log("User found with correct login type (email), proceeding with login");

          // Save session
          await saveSession(sessionData);

          // Redirect to the dashboard or appropriate page
          return NextResponse.redirect(new URL('/dashboard', req.url));
        } else {
          // User exists with a different login type, redirect to error page
          console.log("User found with incorrect login type, redirecting to error page");

          // Redirect to error page with appropriate error message
          return NextResponse.redirect(new URL('/error', req.url));
        }
      } else {
        // User does not exist, create a new organization and User with the received email
        console.log("User not found continuing with creating new user")

        // Create a new User for the user with the received email
        const newUser = await User.create({
          email: email,
          image: picture,
          firstname: given_name,
          lastname: family_name,
          loginType: 'google', // or the appropriate login type
        });

        // Create session data
        const sessionData = {
          userId: newUser._id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          image: newUser.image,
          isOnboarded: newUser.onboarded,
          isVerified: newUser.verified,
          isLoggedIn: true
        };

        // Save session
        await saveSession(sessionData);

        // Redirect to the dashboard or appropriate page
        return NextResponse.redirect(new URL('/dashboard', req.url));
        }
      } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error:', error);
        return Response.json({ error: 'Internal Server Error', status: 500 });
      }    

    } catch (error) {
      console.error('Error exchanging code for token or fetching user profile:', error);
      return Response.json('Internal Server Error', {status: 500})
    }
  } else {
    return Response.json('Method nto allowed', {status: 405})
  }
}

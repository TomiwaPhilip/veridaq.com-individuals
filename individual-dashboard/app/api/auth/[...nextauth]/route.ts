import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/lib/model/database";
import User from "@/lib/utils/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
          clientId: "153949545570-mo279nld450pso6kefv31ljtf83pgc9o.apps.googleusercontent.com",
          clientSecret: "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"
        })
      ],
    session: { strategy: "jwt" },
    callbacks: {
        async signIn({ account, profile, user, credentials }) {
          try {
            await connectToDB();
    
            // check if user already exists
            const userExists = await User.findOne({ email: user.email });
    
            // if not, create a new document and save user in MongoDB
            if (!userExists) {

              // Split the name by spaces to extract first name and last name
              const nameParts = user.name.split(" ");
              const firstName = nameParts[0];
              const lastName = nameParts.slice(1).join(" ");

              await User.create({
                email: user.email,
                firstname: firstName,
                lastname: lastName,
                image: user.image,
              });


            }
    
            return true
          } catch (error: any) {
            console.log("Error checking if user exists: ", error.message);
            return false
          }
        },
      },
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query string as ?error=
        newUser: '/auth/onboarding' // New users will be directed here on first sign in (leave the property out if not of interest)
      }
})

export { handler as GET, handler as POST }
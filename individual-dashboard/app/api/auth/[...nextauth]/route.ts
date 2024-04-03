export { GET, POST } from '@/auth'

// export const runtime = "edge"


// import NextAuth from "next-auth";
// import { NextAuthConfig } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import LinkedInProvider from "next-auth/providers/linkedin";
// import { sendVerificationRequest } from "@/lib/utils";
// import EmailProvider from 'next-auth/providers/email';
// import { MongoDBAdapter } from "@auth/mongodb-adapter"

// import clientPromise from "@/lib/model/database";
// import User from "@/lib/utils/user";


// export const authOptions: NextAuthConfig = {
//   adapter: MongoDBAdapter(clientPromise),
//   // Configure one or more authentication providers
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//     LinkedInProvider({
//       clientId: process.env.LINKEDIN_CLIENT_ID as string,
//       clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
//     }),
//     EmailProvider({
//       from: 'noreply@veridaq.com',
//       // Custom sendVerificationRequest() function
//       sendVerificationRequest,
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET as string,
//   session: { strategy: "jwt" },
//   callbacks: {
//     // async signIn({ account, profile, user, credentials }) {
//     //   try {
//     //     await connectToDB();
    
//     //     console.log("I made a connect to DB");
//     //     // Check if user object and name property are defined
//     //     if (user?.email && user?.name) {
//     //       // Check if user already exists
//     //       const userExists = await User.findOne({ email: user.email });
    
//     //       // If not, create a new document and save user in MongoDB
//     //       if (!userExists) {
//     //         // Split the name by spaces to extract first name and last name
//     //         const nameParts = user.name.split(" ");
//     //         const firstName = nameParts[0];
//     //         const lastName = nameParts.slice(1).join(" ");
    
//     //         await User.create({
//     //           email: user.email,
//     //           firstname: firstName,
//     //           lastname: lastName,
//     //           image: user.image,
//     //         });
//     //       }
//     //     } else {
//     //       console.error("User email or name is undefined or null");
//     //       return false;
//     //     }
    
//     //     console.log("I'm returning true");
//     //     return true;
//     //   } catch (error: any) {
//     //     console.log("Error checking if user exists: ", error.message);
//     //     return false;
//     //   }
//     },    
//   // },
//   pages: {
//     signIn: "/auth/signin",
//     signOut: "/auth/signout",
//     error: "/auth/error", // Error code passed in query string as ?error=
//     newUser: "/auth/onboarding", // New users will be directed here on first sign in (leave the property out if not of interest)
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

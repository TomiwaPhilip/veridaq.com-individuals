import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
          clientId: "153949545570-mo279nld450pso6kefv31ljtf83pgc9o.apps.googleusercontent.com",
          clientSecret: "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"
        })
      ],
    session: { strategy: "jwt" },
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
      }
})

export { handler as GET, handler as POST }
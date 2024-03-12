import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
          clientId: "153949545570-mo279nld450pso6kefv31ljtf83pgc9o.apps.googleusercontent.com",
          clientSecret: "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"
        })
      ]
})

export { handler as GET, handler as POST }
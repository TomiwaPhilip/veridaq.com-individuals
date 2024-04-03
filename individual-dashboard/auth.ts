import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/model/database";
import authConfig from "@/auth.config"


export const { handlers: { GET, POST }, auth } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      console.log("Session Token", token);

      return session;
    },
    async jwt({ token }) {
      console.log("JWT Token", token);
      return token;
    },
  },
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  ...authConfig,
})
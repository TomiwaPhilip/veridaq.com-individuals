import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google";
// import EmailProvider from 'next-auth/providers/nodemailer';


export default {
    providers: [
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    //   EmailProvider({
    //     id: 'email',
    //     name: 'email',
    //     server: {
    //         host: process.env.EMAIL_SERVER_HOST,
    //         port: process.env.EMAIL_SERVER_PORT,
    //         auth: {
    //             user: process.env.EMAIL_SERVER_USER,
    //             pass: process.env.EMAIL_SERVER_PASSWORD
    //         }
    //     },
    //     from: process.env.EMAIL_FROM,
    // })
    ],
  } satisfies NextAuthConfig
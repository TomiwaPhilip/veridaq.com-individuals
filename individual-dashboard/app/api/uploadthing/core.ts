import { getSession } from 'next-auth/react';
import { NextApiRequest } from 'next';
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const getEmail = async ({ req }: { req?: NextApiRequest } = {}): Promise<string | null> => {
    if (req) {
      // If req is provided, use it to get the session
      const session = await getSession({ req });
      return session?.user?.email || null;
    } else {
      // If req is not provided, fetch the session without req
      const session = await getSession();
      return session?.user?.email || null;
    }
};



export const ourFileRouter = {
  media: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async (req) => {
      try {
        // Get the current user's session
        const email = await getEmail();

        // If the session doesn't exist or user email is missing, throw an error
        if (email) {
          throw new Error("Unauthorized");
        }

        // Pass the user email to onUploadComplete
        return { userEmail: email };
      } catch (error) {
        console.error("Error retrieving session");
        throw new Error("Unauthorized");
      }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        // Access the user email passed from the middleware
        console.log("Upload complete for userEmail:", metadata.userEmail);

        // Access the uploaded file URL
        console.log("File URL:", file.url);
      } catch (error) {
        console.error("Error processing upload");
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

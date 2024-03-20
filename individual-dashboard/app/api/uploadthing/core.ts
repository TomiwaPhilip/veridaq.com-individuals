import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  media: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async (req) => {
      try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
          throw new Error("Unauthorized");
        }

        const email = session.user.email;

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

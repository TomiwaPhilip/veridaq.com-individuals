"use server";

import getSession from "@/lib/actions/server-hooks/getsession.action";
import connectToDB from "../model/database";
import Feedback from "../utils/feedbackSchema"; // Ensure this path is correct

interface Params {
  message: string;
}

export async function createUserFeedback(params: Params) {
  console.log(params.message);
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("You are unauthorized");
    }

    const userId = session.userId;

    console.log("User ID:", userId);
    console.log("Session:", session);

    await connectToDB(); // Ensure it waits for the connection

    const feedback = await Feedback.create({
      message: params.message,
      user: userId,
      created: Date.now(),
    });

    if (feedback) {
      return {message: "Your feedback has been successfully submitted. We will get back to you through your email."}
    } else {
      return {mesage: "There is an error sending feedback. Please try again!"}
    }

  } catch (error: any) {
    console.error("Error creating feedback:", error);
    throw new Error(`Failed to create new feedback: ${error.message}`);
  }
}

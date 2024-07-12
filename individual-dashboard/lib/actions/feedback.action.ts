"use server";

import getSession from "@/lib/actions/server-hooks/getsession.action";
import connectToDB from "../model/database";
import FeedBack from "../utils/feedbackSchema";

interface Params {
  message: string;
}

export async function createUserFeedback(params: Params) {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("you are unauthorized");
    }

    const userId = session.userId;

    console.log(userId);
    console.log(session);

    connectToDB();

    const res = await FeedBack.create(
      { message: params.message, user: userId, created: Date.now() },
      { upsert: true }
    );

    console.log(res, "feedback res");

    await session.save();
  } catch (error: any) {
    throw new Error(`Failed to create new feedback: ${error.message}`);
  }
}

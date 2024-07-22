"use server";

import getSession from "./getsession.action";

import connectToDB from "@/lib/model/database";
import User from "@/lib/utils/user";

export async function findUserByEmail() {
  connectToDB();

  const session = await getSession();

  const user = await User.findOne({ email: session.email });

  return user;
}

"use server";

import got from "got";
const Flutterwave = require("flutterwave-node-v3");
import { redirect } from "next/navigation";

import getSession from "./server-hooks/getsession.action";
import User from "../utils/user";
import connectToDB from "../model/database";
import VerifiedPayment from "../utils/verfiedPayment";

function generateRandomString(length: any) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export async function getPaymentLink(type: boolean, amount: number) {
  // console.log(params.email, params.amount)

  const session = await getSession();

  if (!session) {
    throw new Error("User is not authenticated!");
  }
  let isAccessFee = "False";

  if (type === true) isAccessFee = "True";

  const customerName = `${session.firstName} ${session.lastName}`;

  const transaction_ref = generateRandomString(16);

  const response: any = await got
    .post("https://sandboxapi.fincra.com/checkout/payments", {
      headers: {
        "api-key": `${process.env.FINCRA_SECRET_KEY}`,
        "x-pub-key": `${process.env.FINCRA_PUBLIC_KEY}`,
      },
      json: {
        amount: amount,
        currency: "NGN",
        customer: {
          name: customerName,
          email: session.email,
        },
        paymentMethods: ["card", "bank_transfer"],
        feeBearer: "customer",
        reference: transaction_ref,
        redirectUrl: `https://individual.veridaq.com/auth/payment?isAccessFee=${isAccessFee}`,
      },
    })
    .json();

  console.log(response);

  redirect(response.data.link);
}

// Function to convert string to number
export async function convertStringToNumber(str: string) {
  // Remove decimal point and convert string to integer
  const integer = parseInt(str.replace(".", ""));

  return integer;
}

// Function to convert number to string
export async function convertNumberToString(num: number) {
  // Convert number to string
  let str = num.toString();
  str = `${str}.00`;

  return str;
}

export async function verifyPayment({
  tx_ref,
  isAccessFee,
}: {
  tx_ref: string;
  isAccessFee: string;
}) {
  console.log(tx_ref, "At the server");

  try {
    // Connect to the database
    await connectToDB();

    const session = await getSession();
    const userId = session.userId;

    // Check if payment is already verified
    const paymentDetails = await VerifiedPayment.findOne(
      { ref: tx_ref },
      { verified: 1, _id: 0 },
    );
    console.log(paymentDetails);
    if (paymentDetails && paymentDetails.verified) {
      return { error: "Error: Payment verification outdate!" };
    }

    // Fetch payment details from Fincra
    const response: any = await got.get(
      `https://sandboxapi.fincra.com/checkout/payments/merchant-reference/${tx_ref}`,
      {
        headers: {
          "api-key": `${process.env.FINCRA_SECRET_KEY}`,
          "x-pub-key": `${process.env.FINCRA_PUBLIC_KEY}`,
          "x-business-id": `${process.env.FINCRA_BUSINESS_ID}`,
        },
        responseType: "json",
      },
    );

    console.log(response.body);

    if (
      response.body.status === true &&
      response.body.data.status === "success"
    ) {
      if (isAccessFee === "False") {
        // Update wallet balance in DB and session
        const user = await User.findById(userId).select(
          "walletBalance verified",
        );
        if (!user) throw new Error("User not found");

        const convertedSessionBalance = await convertStringToNumber(
          user.walletBalance as string,
        );
        const addedBalance =
          convertedSessionBalance + response.body.data.amount;
        const newBalance = await convertNumberToString(addedBalance);

        user.walletBalance = newBalance;
        user.verified = true; // Update verified field
        await user.save();

        const newPaymentDetails = new VerifiedPayment({
          ref: tx_ref,
          verified: true,
          user: userId,
        });
        await newPaymentDetails.save();

        console.log(user, newPaymentDetails);
        session.isVerified = true;
        await session.save();
        return { message: "Payment Successful!", isAccessFee: false };
      } else if (isAccessFee === "True") {
        // Update Access fee in DB and session
        const user = await User.findByIdAndUpdate(
          userId,
          { hasAccessFee: true },
          { new: true, upsert: true },
        );
        if (!user) throw new Error("User not found");

        console.log(user);
        session.hasAccessFee = user.hasAccessFee;
        await session.save();
        return { message: "Payment Successful", isAccessFee: true };
      }
    } else {
      return { error: "Unable to verify payments. Try reloading this page!" };
    }
  } catch (error) {
    console.error("Error Verifying Payments", error);
    return { error: "Unable to verify payments. Try reloading this page!" };
  }
}

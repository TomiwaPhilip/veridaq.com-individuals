"use server";

import got from "got";
const Flutterwave = require("flutterwave-node-v3");
import { redirect } from "next/navigation";

import getSession from "./server-hooks/getsession.action";
import User from "../utils/user";
import connectToDB from "../model/database";
import VerifiedPayment from "../utils/verfiedPayment";

function generateRandomString(length: any) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

interface getPaymentParams {
    email: string,
    amount: number,
}

export async function getPaymentLink (params: getPaymentParams) {
    console.log(params.email, params.amount)

    const transaction_ref = generateRandomString(16);

    const response: any = await got.post('https://api.flutterwave.com/v3/payments',
        {
            headers: {
                Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
            },
            json: {
                amount: params.amount,
                currency: 'NGN',
                tx_ref: transaction_ref,
                redirect_url: 'https://glowing-bassoon-69vxwrq9jp4xf7gx-3000.app.github.dev/auth/payment',
                customer: {
                    email: params.email,
                }
            },
        }
    ).json()

    console.log(response)
    
    redirect(response.data.link)
  
}

// Function to convert string to number
function convertStringToNumber(str: string) {
    // Remove decimal point and convert string to integer
    const integer = parseInt(str.replace('.', ''));

    return integer;
}

// Function to convert number to string
function convertNumberToString(num: number) {
    // Convert number to string
    let str = num.toString();
    str = `${str}.00`

    return str;
}

export async function verifyPayment (
    {status, tx_ref, transaction_id,}: 
    {status: string; tx_ref: string; transaction_id: number;}) 
    {

    console.log(status, tx_ref, transaction_id, "At the serever");
    const flw = new Flutterwave(
      process.env.FLW_PUBLIC_KEY,
      process.env.FLW_SECRET_KEY,
    );
 

    try {
        // Connect to the database
        connectToDB();

        const session = await getSession();
        const userId = session.userId;

        const paymentDetails = await VerifiedPayment.findOne({ ref: tx_ref }, { verified: 1, _id: 0 });
        console.log(paymentDetails);
        if (paymentDetails) {
            if(paymentDetails.verified) return false
        }
        
        if (status === "successful" || status === "completed") {
            console.log(status, tx_ref, transaction_id, "At the server");
            const response = await flw.Transaction.verify({ id: transaction_id });
            console.log(response);
        
            if (
            response.data.status === "successful" ||
            response.data.status === "completed"
            ) {
                // Success!

                // Update wallet balance in DB and Session
                const user = await User.findOne({ _id: userId }, { walletBalance: 1, _id: 0 });
                
                const convertedSessionBalance = convertStringToNumber(user.walletBalance as string);
                const addedBalance = convertedSessionBalance + response.data.amount;
                const newBalance = convertNumberToString(addedBalance);

                // Update the user in the database
                const userDetails = await User.findOneAndUpdate(
                    { _id: userId }, 
                    {
                        walletBalance: newBalance,
                    },
                    // Upsert means both updating and inserting
                    { upsert: true, 
                        new: true,
                    },
                );

                const paymentDetails = new VerifiedPayment({
                    ref: tx_ref,
                    verified: true,
                    user: userId,
                });

                await paymentDetails.save();

                console.log(userDetails, paymentDetails);
                session.walletBalance = userDetails.walletBalance;
                await session.save();
                return true;
            }
        } else {
            return false
        }
    } catch(error) {
        console.error("Error Verifying Payments", error);
        return false;
    }
}


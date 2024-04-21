"use server";

import got from "got";
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

    const response: any = await got.post('https://api-d.squadco.com/transaction/initiate',
        {
            headers: {
                Authorization: "Bearer sk_bffcefd1f820a26fcf3d8a5e5d7976cb1b46d80d",
            },
            json: {
                amount: params.amount,
                email: params.email,
                currency: 'NGN',
                initiate_type: 'inline',
                transaction_ref: transaction_ref,
                callback_url: 'http://squadco.com'
            },
        }
    ).json()

    console.log(response)
    
    redirect(response.data.checkout_url)
  
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

    // If string length is less than 3, prepend zeros until length is at least 3
    while (str.length < 3) {
        str = "0" + str;
    }

    // Insert decimal point two characters from the end of the string
    const result = str.slice(0, -2) + "." + str.slice(-2);

    return result;
}

export async function verifyPayment (ref: string) {
    console.log(ref)

    // Connect to the database
    connectToDB();

    const session = await getSession();
    const userId = session.userId;

    const paymentDetails = await VerifiedPayment.findOne({ ref: ref }, { verified: 1, _id: 0 });
    console.log(paymentDetails);
    if (paymentDetails) {
        if(paymentDetails.verified) return false
    }
    
    const url = `https://api-d.squadco.com/transaction/verify/${ref}`;

    const response: any = await got.get(url, {
        headers: {
            Authorization: "Bearer sk_bffcefd1f820a26fcf3d8a5e5d7976cb1b46d80d",
        },
        responseType: 'json' // Automatically parse response body as JSON
    });

    console.log(response.body)

    if(response.body.success === true){
        
        const user = await User.findOne({ _id: userId }, { walletBalance: 1, _id: 0 });

        const convertedSessionBalance = convertStringToNumber(user.walletBalance as string);
        const addedBalance = convertedSessionBalance + response.body.data.transaction_amount;
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
            ref: ref,
            verified: true,
            user: userId,
        });

        await paymentDetails.save();

        console.log(userDetails, paymentDetails);
        session.walletBalance = userDetails.walletBalance;
        await session.save();
        return true;
    } else {
        return false
    }
    
}


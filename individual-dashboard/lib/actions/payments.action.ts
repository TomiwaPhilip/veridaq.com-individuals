"use server";

import got from "got";
import { redirect } from "next/navigation";

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

export async function confirmPayment (ref: string) {
    console.log(ref)

    const url = `https://sandbox-api-d.squadco.com/transaction/verify/${ref}`;

    const response = await got.get(url, {
        headers: {
            Authorization: "Bearer sandbox_sk_94f2b798466408ef4d19e848ee1a4d1a3e93f104046f",
        },
        responseType: 'json' // Automatically parse response body as JSON
    });

    console.log(response)
    
    // redirect(response.data.checkout_url)
  
}


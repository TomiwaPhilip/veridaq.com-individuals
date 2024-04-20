"use server";

import axios from "axios";
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

export function getPaymentLink (params: getPaymentParams): Promise<undefined> {
    
    // Request configuration
    const config = {
        headers: {
        'Authorization': 'Bearer sandbox_sk_94f2b798466408ef4d19e848ee1a4d1a3e93f104046f',
        'Content-Type': 'application/json'
        }
    };

    const transaction_ref = generateRandomString(16);
    
    // Request body
    const data = {
        amount: params.amount,
        email: params.email,
        currency: 'NGN',
        initiate_type: 'inline',
        transaction_ref: transaction_ref,
        callback_url: 'http://squadco.com'
    };

    let responseUrl: any;

    // Make POST request
    axios.post('https://sandbox-api-d.squadco.com/transaction/initiate', data, config)
        .then(response => {
        console.log('Response:', response.data);
        responseUrl = response.data.checkout_url;
        })
        .catch(error => {
        console.error('Error:', error.response.data);
        });
    
    redirect(responseUrl)
  
}


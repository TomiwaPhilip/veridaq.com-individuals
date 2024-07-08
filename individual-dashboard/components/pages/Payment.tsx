"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { verifyPayment } from "@/lib/actions/payments.action";
import { RiLoader4Line } from "react-icons/ri";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const [verifyResult, setVerifyResult] = useState("");
  const [loading, setLoading] = useState(true); // Set loading to false initially
  const router = useRouter();

  // const status = searchParams.get("status") as string;
  const isAccessFee = searchParams.get("isAccessFee") as string;
  console.log("access Fee:", isAccessFee);

  function extractParts(queryString: string) {
    const parts = queryString.split('?');
    if (parts.length !== 2) {
        throw new Error('Invalid query string format');
    }

    const firstPart = parts[0]; // "True" or "False"
    const secondPart = parts[1].split('=')[1]; // The value after "=reference"

    return { firstPart, secondPart };
}

const {firstPart, secondPart} = extractParts(isAccessFee)

  useEffect(() => {
    async function checkPayment() {
      console.log("Running the function!");

      try {
        const verify = await verifyPayment({
          tx_ref: secondPart,
          isAccessFee: firstPart, 
        });
        if (verify?.message) {
          setVerifyResult(verify.message);
          setLoading(false);
          if(verify.isAccessFee ===  false) {
            console.log("IsAccessFee at console:", verify.isAccessFee)
            router.replace('/auth/verify');
          } else {window.location.href = "/";}
        } else if(verify?.error) {
          setVerifyResult(verify.error);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    }

    checkPayment(); // Call checkPayment directly when component mounts
  }, []);

  return (
    <main>
      <div className="flex flex-col items-center justify-center h-screen text-white">
        {loading ? (
          <>
            <RiLoader4Line className="animate-spin text-2xl mb-4" />
            <p className="text-center text-xl font-bold p-10">
              Verifying Payment...
            </p>
          </>
        ) : (
          <p className="text-center text-xl font-bold">{verifyResult}</p>
        )}
      </div>
    </main>
  );
}
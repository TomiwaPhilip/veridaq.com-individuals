"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { verifyPayment } from "@/lib/actions/payments.action";
import { RiLoader4Line } from "react-icons/ri";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const [verifyResult, setVerifyResult] = useState("");
  const [loading, setLoading] = useState(true); // Set loading to false initially

  const status = searchParams.get("status") as string;
  const tx_ref = searchParams.get("tx_ref") as string;
  const transaction_idString = searchParams.get("transaction_id") as string;
  const transaction_id = parseInt(transaction_idString);
  console.log(status, tx_ref, transaction_id);

  useEffect(() => {
    async function checkPayment() {
      console.log("Running the function!");

      try {
        const verify = await verifyPayment({
          status: status,
          tx_ref: tx_ref,
          transaction_id: transaction_id,
        });
        if (verify) {
          setVerifyResult("Your payment has been verified and confirmed!");
          setLoading(false);
          window.location.href = "/";
        } else {
          setVerifyResult("Your payment was not successful. Please try again.");
          setLoading(false);
          window.location.href = "/";
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
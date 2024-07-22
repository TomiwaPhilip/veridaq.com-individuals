"use client";

import PaymentPage from "@/components/pages/Payment";
import { Suspense } from "react";

export default function Payment() {

    return (
        <Suspense>
            <PaymentPage />
        </Suspense>
    );
}
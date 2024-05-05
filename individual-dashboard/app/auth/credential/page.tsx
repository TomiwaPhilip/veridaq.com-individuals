"use client";

import CredentialPage from "@/components/pages/Credential";
import { Suspense } from "react";

export default function Credential() {

    return (
        <Suspense>
            <CredentialPage />
        </Suspense>
    );
}
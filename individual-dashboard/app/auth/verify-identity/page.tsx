import IdentityVerification from "@/components/pages/IdentityVerification";
import getSession from "@/lib/actions/server-hooks/getsession.action";
import { redirect } from "next/navigation";

export default async function Page() {

    const session = await getSession();

    if(!session.isVerified) {
        redirect('/');
    }
    return (
        <IdentityVerification />
    );
}
import { redirect } from "next/navigation";
import getSession from "@/lib/actions/server-hooks/getsession.action";

import HomePage from "@/components/pages/Home";

export default async function Home() {
  const session = await getSession();
  console.log(session);

  if (!session.isOnboarded) {
    redirect("/auth/onboarding"); // Use redirect for redirection
    // } else if (!session.isVerified) {
    //   redirect('/auth/verification')
  }

  return <HomePage />;
}

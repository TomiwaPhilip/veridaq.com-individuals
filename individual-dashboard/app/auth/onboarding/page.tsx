import getSession from "@/lib/actions/server-hooks/getsession.action";

import Onboard from "@/components/form/onboarding/onboard";
import {redirect} from "next/navigation"

export default async function Onboarding() {
  const session = await getSession();

  // if (session.isOnboarded) {
  //   redirect("/");
  // }
  return (
    <Onboard />
  );
}

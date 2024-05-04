import { getUserDetails } from "@/lib/actions/onboarding.action";
import Settings from "../form/settings/settings";


async function getUser() {
  const userDetailsfromDB = await getUserDetails();

  return userDetailsfromDB;
}

export default async function SettingsPage() {
  const userDetailsfromDB = await getUser();
  return (
    <>
      <Settings
        firstName={userDetailsfromDB?.firstname ?? null}
        lastName={userDetailsfromDB?.lastname ?? null}
        middleName={userDetailsfromDB?.middlename ?? null}
        streetAddress={userDetailsfromDB?.street_address ?? null}
        city={userDetailsfromDB?.city ?? null}
        country={userDetailsfromDB?.country ?? null}
        image={userDetailsfromDB?.image ?? null}
        professionalDesignation={userDetailsfromDB?.professional_designation ?? null}
      />
    </>
  );
}

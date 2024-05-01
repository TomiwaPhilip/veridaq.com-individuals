import { getUserDetails } from "@/lib/actions/onboarding.action";
import Settings from "../form/settings/settings";

export default async function SettingsPage() {
  const userDetailsfromDB = await getUserDetails();

  return (
    <>
      <Settings
        firstName={userDetailsfromDB.firstname}
        lastName={userDetailsfromDB.lastname}
        middleName={userDetailsfromDB.middlename}
        streetAddress={userDetailsfromDB.street_address}
        city={userDetailsfromDB.city}
        country={userDetailsfromDB.country}
        image={userDetailsfromDB.image}
        professionalDesignation={userDetailsfromDB.professional_designation}
      />
    </>
  );
}

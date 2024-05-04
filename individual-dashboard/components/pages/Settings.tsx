"use client";

import { useEffect, useState } from 'react';
import { getUserDetails } from '@/lib/actions/onboarding.action';
import Settings from '../form/settings/settings';

export default function SettingsPage() {
  const [userDetailsfromDB, setUserDetailsfromDB] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = await getUserDetails();
        setUserDetailsfromDB(userDetails);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {userDetailsfromDB && (
        <Settings
          firstName={userDetailsfromDB.firstname ?? null}
          lastName={userDetailsfromDB.lastname ?? null}
          middleName={userDetailsfromDB.middlename ?? null}
          streetAddress={userDetailsfromDB.street_address ?? null}
          city={userDetailsfromDB.city ?? null}
          country={userDetailsfromDB.country ?? null}
          image={userDetailsfromDB.image ?? null}
          professionalDesignation={userDetailsfromDB.professional_designation ?? null}
        />
      )}
    </>
  );
}

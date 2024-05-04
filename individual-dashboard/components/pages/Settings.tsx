"use client";

import { useEffect, useState } from 'react';
import { getUserDetails } from '@/lib/actions/onboarding.action';
import Settings from '../form/settings/settings';

export interface UserDetails {
  firstname: string;
  lastname: string;
  middlename: string;
  street_address: string;
  city: string;
  country: string;
  image: string;
  professional_designation: string;
}

export default function SettingsPage() {
  const [userDetailsfromDB, setUserDetailsfromDB] = useState<UserDetails | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails: UserDetails = await getUserDetails();
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

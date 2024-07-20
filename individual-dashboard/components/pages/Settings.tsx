"use client"

import { useEffect, useState } from "react"
import { getUserDetails } from "@/lib/actions/onboarding.action"
import Settings from "../form/settings/settings"
import { useSession } from "../shared/shared"
import { BaseFramerAnimation } from "../shared/Animations"

export interface UserDetails {
  firstname: string
  lastname: string
  middlename: string
  street_address: string
  city: string
  country: string
  image: string
  professional_designation: string
}

export default function SettingsPage() {
  const [userDetailsfromDB, setUserDetailsfromDB] =
    useState<UserDetails | null>(null)
  const session = useSession()
  const isVerified = session?.isVerified

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = await getUserDetails()
        setUserDetailsfromDB(userDetails)
      } catch (error) {
        console.error("Error fetching user details:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <BaseFramerAnimation>
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
            professionalDesignation={
              userDetailsfromDB.professional_designation ?? null
            }
          />
        )}
        {isVerified ? (
          <p className="text-[20px] text-gradient pt-10 font-bold">
            Verification Status: You are a Verified Veridaq User!
          </p>
        ) : (
          <p className="text-[20px] text-gradient pt-10 font-bold">
            Verification Status: You are not Verified yet.
          </p>
        )}
      </>
    </BaseFramerAnimation>
  )
}

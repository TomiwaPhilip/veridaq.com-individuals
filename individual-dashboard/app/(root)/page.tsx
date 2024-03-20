"use client"

import Image from 'next/image'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { getUser } from '@/lib/actions/home.action';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    // Render loading state if session status is still loading
    return <div>Loading...</div>;
  }

  if (!session || !session.user) {
    // If no session or user, redirect to login page
    router.push('/auth/signin');
    return null; // Return null or loading indicator
  }

  const email = session.user.email;
  
  // Ensure email is not null or undefined before calling getUser
  if (!email) {
    console.error('User email is missing in session.');
    return null; // Return null or handle error appropriately
  }

  // Fetch user data and handle it
  getUser(email)
    .then(user => {
      if (!user) {
        console.error('User data not found.');
        return; // Handle error or return early
      }

      const { onboarded, verified } = user;

      if (!onboarded) {
        router.push('/auth/onboarding');
      } else if (!verified) {
        router.push('/auth/verify');
      }
    })
    .catch(error => {
      console.error('Failed to fetch user data:', error.message);
      // Handle error
    });

  return (
    <div className="bg-[#E1D7E2]">
      <label
        htmlFor="search"
        className="flex items-center gap-4 gradient-border1 w-max p-2 ml-auto rounded-md mt-8"
      >
        <input
          type="text"
          id="search"
          placeholder="search"
          className="border-none outline-none block bg-transparent w-[250px] text-[#5E5C64] placeholder:text-[#5E5C64] capitalize"
        />
        <Image
          src="/assets/icons/search.svg"
          width={25}
          height={25}
          className="object-contain"
          alt="search"
        />
      </label>
    </div>
  )
}

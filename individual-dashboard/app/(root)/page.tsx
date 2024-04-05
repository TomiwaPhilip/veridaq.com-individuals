import { redirect } from 'next/navigation'; // Import useredirect for redirection


import HomePage from "@/components/pages/Home"

export default async function Home() {

    // const session = await getServerSession(authOptions);

    // const email = session?.user?.email;

    // if (!email) {
    //   console.error('User email not found.');
    //   return;
    // }

    // // Fetch user data and handle it
    // const user = await getUser(email);
    // if (!user) {
    //   console.error('User data not found.');
    //   return;
    // }

    // const { onboarded, verified } = user;

    // if (!onboarded) {
    //   redirect('/auth/onboarding'); // Use redirect for redirection
    // } else if (!verified) {
    //   redirect('/auth/verify'); // Use redirect for redirection
    // };

  return (
    <HomePage />
  );
}

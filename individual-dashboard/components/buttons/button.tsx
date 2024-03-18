import Link from "next/link";
import { signIn } from "next-auth/react";

export function Button({
  name,
  type,
}: {
  name: string;
  type: "submit" | "button";
}) {
  return (
    <button
      type={type}
      className="gradient text-white font-medium text-[20px] w-[200px] h-[70px] rounded-md"
    >
      {name}
    </button>
  );
}

export function GoogleButton() {
  return (
    <button
      className="bg-[#E18571] flex items-center justify-center py-3 px-10 w-full rounded-lg"
      onClick={() => signIn("google")} // Call signIn with the provider ID ("google" in this case)
    >
      <img
        src="/assets/icons/google_icon.svg"
        className="w-8 h-8 mr-2"
        alt="Google Logo"
      />
      <span className="font-semibold text-[18px]">Sign in with Google</span>
    </button>
  );
}

export function LinkedinButton() {
  return (
    <button
      className="bg-[#E18571] flex items-center justify-center py-3 px-10 w-full rounded-lg"
      onClick={() => signIn("linkedin")} // Call signIn with the provider ID ("google" in this case)
    >
      <img
        src="/assets/icons/google_icon.svg"
        className="w-8 h-8 mr-2"
        alt="Google Logo"
      />
      <span className="font-semibold text-[18px]">Sign in with Google</span>
    </button>
  );
}

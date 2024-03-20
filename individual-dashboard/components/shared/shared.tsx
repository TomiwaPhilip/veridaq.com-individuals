"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut } from 'next-auth/react';

// This is the Nav

export function Nav() {
  return (
    <nav className="bg-[#38313A] w-max min-h-screen p-4 flex flex-col">
      <Image
        alt="Veridaq logo"
        src="/assets/images/veridaq-logo.png"
        width={100}
        height={100}
        className="mx-auto"
      />
      <div className="my-auto">
        <ul className="list-none flex flex-col gap-2">
          <li className="gradient-border rounded-md">
            <Link
              href="/"
              className="flex bg-[#38313A] items-center gap-4 text-white font-medium p-4"
            >
              <Image
                alt="home"
                src="/assets/icons/home.svg"
                width={20}
                height={20}
              />
              Home
            </Link>
          </li>
          <li className="gradient-border rounded-md">
            <Link
              href="/"
              className="flex bg-[#38313A] items-center gap-4 text-white font-medium p-4"
            >
              <Image
                alt="inbox"
                src="/assets/icons/send.svg"
                width={20}
                height={20}
              />
              Veridaq Box
            </Link>
          </li>
          <li className="gradient-border rounded-md">
            <Link
              href="/"
              className="flex bg-[#38313A] items-center gap-4 text-white font-medium p-4"
            >
              <Image
                alt="issue"
                src="/assets/icons/message.svg"
                width={20}
                height={20}
              />
              Veridaq Issue
            </Link>
          </li>
          <li className="gradient-border rounded-md">
            <Link
              href="/"
              className="flex bg-[#38313A] items-center gap-4 text-white font-medium p-4"
            >
              <Image
                alt="store"
                src="/assets/icons/security.svg"
                width={20}
                height={20}
              />
              Veridaq Store
            </Link>
          </li>
          <li className="gradient-border rounded-md">
            <Link
              href="/"
              className="flex bg-[#38313A] items-center gap-4 text-white font-medium p-4"
            >
              <Image
                alt="settings"
                src="/assets/icons/settings.svg"
                width={20}
                height={20}
              />
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

const handleSignOut = async () => {
  await signOut({ redirect: true, callbackUrl: '/auth/sign-in' });
};

export function Header() {
  return (
    <header className="flex items-center gap-4">
      <p className="text-xl font-semibold text-gradient mr-auto">
        Download and share your Veridaq, here.
      </p>
      <Image
        alt="notifications"
        src="/assets/icons/bell.svg"
        width={30}
        height={30}
      />
        <Image
          alt="user"
          src="/assets/images/user.png"
          width={30}
          height={30}
          onClick={handleSignOut}
          style={{ cursor: 'pointer' }}
        />
    </header>
  );
}

// Cards for the home page
export function Card({
  heading,
  paragraph,
  bgColor,
  outlineColor,
}: {
  heading: string;
  paragraph: string;
  bgColor: string;
  outlineColor: string;
}) {
  return (
    <div
      className="card"
      style={{ backgroundColor: bgColor, borderColor: outlineColor }}
    >
      <p>{heading}</p>
      <p>{paragraph}</p>
    </div>
  );
}

// This is the Right SVG
export function Rightsvgs() {
  return (
    <svg
      width="700"
      height="700"
      viewBox="0 0 473 464"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        width: "500px",
        height: "500px",
        pointerEvents: "none",
      }}
    >
      <g filter="url(#filter0_f_130_3608)">
        <ellipse cx="370.5" cy="368.5" rx="170.5" ry="168.5" fill="#A593C5" />
      </g>
      <defs>
        <filter
          id="filter0_f_130_3608"
          x="0"
          y="0"
          width="741"
          height="737"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="100"
            result="effect1_foregroundBlur_130_3608"
          />
        </filter>
      </defs>
    </svg>
  );
}

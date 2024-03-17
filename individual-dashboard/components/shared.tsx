import Image from "next/image";
import Link from "next/link";

// This is the Nav

export function Nav() {
  return (
    <nav className="bg-[#38313A] w-max min-h-screen p-4 flex flex-col">
      <Image
        alt="Veridaq logo"
        src="/veridaq-logo.png"
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
              <Image alt="home" src="/home.svg" width={20} height={20} />
              Home
            </Link>
          </li>
          <li className="gradient-border rounded-md">
            <Link
              href="/"
              className="flex bg-[#38313A] items-center gap-4 text-white font-medium p-4"
            >
              <Image alt="inbox" src="/send.svg" width={20} height={20} />
              Veridaq Box
            </Link>
          </li>
          <li className="gradient-border rounded-md">
            <Link
              href="/"
              className="flex bg-[#38313A] items-center gap-4 text-white font-medium p-4"
            >
              <Image alt="issue" src="/message.svg" width={20} height={20} />
              Veridaq Issue
            </Link>
          </li>
          <li className="gradient-border rounded-md">
            <Link
              href="/"
              className="flex bg-[#38313A] items-center gap-4 text-white font-medium p-4"
            >
              <Image alt="store" src="/security.svg" width={20} height={20} />
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
                src="/settings.svg"
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

export function Header() {
  return (
    <header className="flex items-center gap-4">
      <p className="text-xl font-semibold text-gradient mr-auto">
        Download and share your Veridaq, here.
      </p>
      <Image alt="notifications" src="/bell.svg" width={30} height={30} />
      <Image alt="user" src="/user.png" width={30} height={30} />
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

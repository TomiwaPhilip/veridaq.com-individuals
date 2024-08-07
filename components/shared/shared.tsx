"use client"

import Image from "next/image"
import Link from "next/link"
import { signOut } from "@/lib/actions/login.action"
import { usePathname } from "next/navigation"
import { getSession2 } from "@/lib/actions/server-hooks/getsession.action"
import { useState, useEffect } from "react"
import { SessionData } from "@/lib/iron-session/session"
import { getPaymentLink } from "@/lib/actions/payments.action"

export function useSession() {
  const [session, setSession] = useState<SessionData | null>(null)

  useEffect(() => {
    async function fetchSession() {
      try {
        const sessionData = await getSession2()
        setSession(sessionData)
      } catch (error) {
        console.error("Error getting session:", error)
      }
    }

    fetchSession()
  }, [])

  return session
}

// This is the Nav

export function Nav() {
  const pathname = usePathname()
  return (
    <nav className="bg-[#38313A] w-max min-h-screen p-4 flex flex-col fixed top-0 left-0 overflow-y-auto hidden lg:block">
      <Image
        alt="Veridaq logo"
        src="/assets/images/veridaq-logo.png"
        width={100}
        height={100}
        className="mx-auto"
      />
      <div className="flex flex-col justify-center items-center min-h-screen">
        <ul className="list-none flex flex-col gap-2">
          <li
            className={`gradient-border rounded-md ${
              pathname === "/" ? "normal-gradient-border" : ""
            }`}
          >
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
          <li
            className={`gradient-border rounded-md ${
              pathname === "/veridaq-request" ? "normal-gradient-border" : ""
            }`}
          >
            <Link
              href="/veridaq-request"
              className="flex bg-[#38313A] items-center gap-4 text-white font-medium p-4"
            >
              <Image
                alt="inbox"
                src="/assets/icons/send.svg"
                width={20}
                height={20}
              />
              Veridaq Request
            </Link>
          </li>
          <li
            className={`gradient-border rounded-md ${
              pathname === "/veridaq-box" ? "normal-gradient-border" : ""
            }`}
          >
            <Link
              href="/veridaq-box"
              className="flex bg-[#38313A] items-center gap-4 text-white font-medium p-4"
            >
              <Image
                alt="issue"
                src="/assets/icons/message.svg"
                width={20}
                height={20}
              />
              Veridaq Box
            </Link>
          </li>
          <li
            className={`gradient-border rounded-md ${
              pathname === "/veridaq-store" ? "normal-gradient-border" : ""
            }`}
          >
            <Link
              href="/veridaq-store"
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
          <li
            className={`gradient-border rounded-md ${
              pathname === "/settings" ? "normal-gradient-border" : ""
            }`}
          >
            <Link
              href="/settings"
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
  )
}

export default function BottomBar() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 w-full border-t border-gray-300 bg-gradient-to-t bg-[#38313A] pt-1 pb-2 backdrop-blur-2xl block rounded-t-lg lg:hidden">
      <div className="flex items-center justify-between">
        {/* Icon Links */}
        <div className="text-center flex items-center justify-between w-full px-2 py-2">
          <Link
            href={"/"}
            passHref
            className={`cursor-pointer px-3 py-4 ${
              pathname === "/" ? "border-2 border-[#EA098D] rounded-md" : ""
            }`}
          >
            <img
              src={"/assets/icons/home.svg"}
              alt="Home"
              className="w-8 h-8"
            />
          </Link>
          <Link
            href={"/veridaq-request"}
            passHref
            className={`cursor-pointer px-3 py-4 ${
              pathname === "/veridaq-request"
                ? "border-2 border-[#EA098D] rounded-md"
                : ""
            }`}
          >
            <img
              src={"/assets/icons/send.svg"}
              alt="send"
              className="w-8 h-8"
            />
          </Link>
          <Link
            href={"/veridaq-box"}
            passHref
            className={`cursor-pointer px-3 py-4 ${
              pathname === "/veridaq-box"
                ? "border-2 border-[#EA098D] rounded-md"
                : ""
            }`}
          >
            <img
              src={"/assets/icons/message.svg"}
              alt="message"
              className="w-8 h-8"
            />
          </Link>
          <Link
            href={"/veridaq-store"}
            passHref
            className={`cursor-pointer px-3 py-4 ${
              pathname === "/veridaq-store"
                ? "border-2 border-[#EA098D] rounded-md"
                : ""
            }`}
          >
            <img
              src={"/assets/icons/security.svg"}
              alt="store"
              className="w-8 h-8"
            />
          </Link>
          <Link
            href={"/settings"}
            passHref
            className={`cursor-pointer px-3 py-4 ${
              pathname === "/settings"
                ? "border-2 border-[#EA098D] rounded-md"
                : ""
            }`}
          >
            <img
              src={"/assets/icons/settings.svg"}
              alt="settings"
              className="w-8 h-8"
            />
          </Link>
        </div>
      </div>
    </nav>
  )
}

const handleSignOut = async () => {
  await signOut()
}

export function Header() {
  const pathname = usePathname()
  const session = useSession()
  const name = session?.firstName

  return (
    <header className="flex items-center justify-between text-[23px] w-full md:text-[32px] gap-10">
      {pathname === "/" && (
        <p className="font-semibold text-gradient mr-auto">
          {`Welcome to Veridaq, ${name}`}
        </p>
      )}
      {pathname === "/veridaq-request" && (
        <p className="font-semibold text-gradient mr-auto">
          Request the Veridaq you need, here.
        </p>
      )}
      {pathname === "/veridaq-box" && (
        <p className="font-semibold text-gradient mr-auto">
          Issue Veridaq, here.
        </p>
      )}
      {pathname === "/veridaq-store" && (
        <p className="font-semibold text-gradient mr-auto">
          Download and share your Veridaq, here.
        </p>
      )}
      {pathname === "/settings" && (
        <p className="font-semibold text-gradient mr-auto">
          Configure your Veridaq Account, here.
        </p>
      )}
      <div className="relative text-right">
        {session?.image ? (
          <div className="relative inline-block">
            <Image
              alt="user"
              src={session.image as string}
              className="rounded-full aspect-square object-cover normal-border"
              width={50}
              height={50}
              onClick={handleSignOut}
              style={{ cursor: "pointer" }}
            />
            {session?.isVerified && (
              <div className="absolute top-0 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center border-2 border-white">
                <Image
                  alt="verified"
                  src="/assets/images/veridaq_check.png"
                  width={24}
                  height={24}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="relative inline-block">
            <Image
              alt="fallback"
              src="/assets/images/user.png"
              className="rounded-full aspect-square object-cover normal-border"
              width={50}
              height={50}
              onClick={handleSignOut}
              style={{ cursor: "pointer" }}
            />
            {session?.isVerified && (
              <div className="absolute top-0 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center border-2 border-white">
                <Image
                  alt="verified"
                  src="/assets/images/veridaq_check.png"
                  width={24}
                  height={24}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

// Cards for the home page
export function Card({
  heading,
  paragraph,
  bgColor,
  outlineColor,
}: {
  heading: string
  paragraph: string
  bgColor: string
  outlineColor: string
}) {
  return (
    <div
      className="card rounded-lg p-6 text-[#38313A]"
      style={{
        backgroundColor: bgColor,
        borderColor: outlineColor,
        borderStyle: "solid",
        borderWidth: "3px",
      }}
    >
      <p className="font-bold text-[24px] mt-4">{heading}</p>
      <p className="text-[20px]">{paragraph}</p>
    </div>
  )
}

// Cards for the home page
export function Card2({
  heading,
  bgColor,
  outlineColor,
  textColor,
  id,
  onClick,
}: {
  heading: string
  bgColor: string
  outlineColor: string
  textColor: string
  id: string
  onClick: (id: string) => void
}) {
  const handleClick = () => {
    onClick(id) // Pass the id to the onClick handler
  }

  return (
    <div
      className="card rounded-lg py-[50px] px-5 text-[#38313A] flex items-center justify-center text-center hover:cursor-pointer"
      style={{
        backgroundColor: bgColor,
        borderColor: outlineColor,
        borderStyle: "solid",
        borderWidth: "3px",
        color: textColor,
      }}
      id={id}
      onClick={handleClick} // Use the new handleClick function
    >
      <p className="font-bold text-[20px] mt-4">{heading}</p>
    </div>
  )
}

export function Card3({
  heading,
  bgColor,
  outlineColor,
  textColor,
  link,
}: {
  heading: string
  bgColor: string
  outlineColor: string
  textColor: string
  link: string
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [copy, setCopy] = useState("Copy Link")

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleCopyLink = (link: string) => {
    // Copy link to clipboard
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(link)
        .then(() => {
          setCopy("Copied")
          console.log("Link copied to clipboard!")
          setTimeout(() => {
            setCopy("Copy Link")
          }, 4000)
        })
        .catch((error) => {
          // Unable to write to clipboard
          console.error("Failed to copy link to clipboard:", error)
        })
    } else {
      setCopy("Unable to Copy")
    }
  }

  return (
    <div
      className="card rounded-lg text-[#38313A] text-center relative"
      style={{
        backgroundColor: bgColor,
        borderColor: outlineColor,
        borderStyle: "solid",
        borderWidth: "3px",
        color: textColor,
      }}
    >
      <p className="font-bold text-[20px] mt-4 px-1 py-[30px] text-wrap">
        {heading}
      </p>
      <div
        className="py-2 flex justify-center text-center"
        style={{ backgroundColor: outlineColor }}
      >
        <button onClick={toggleDropdown} className="hover:cursor-pointer">
          <Image
            src={"/assets/icons/icon-command.png"}
            alt="options"
            width={40}
            height={40}
          />
        </button>
        {isDropdownOpen && (
          <div className="absolute top-full right-0 mt-2 z-10 bg-white text-black rounded-lg shadow-md">
            <button
              onClick={() => handleCopyLink(link)}
              className="block w-full py-2 px-4 text-left"
            >
              {copy}
            </button>
            <a href={link} target="_blank">
              <button className="block w-full py-2 px-4 text-left">Open</button>
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

interface SearchBarI
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "type" | "className" | "placeholder" | "id"
  > {}

export function SearchBar({ ...props }: SearchBarI) {
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
          {...props}
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

export function SearchBar2({ ...props }: SearchBarI) {
  return (
    <div className="">
      <label
        htmlFor="search"
        className="flex items-center gap-4 bg-[#E1D7E2] border-4 border-[#554957] w-max p-2 ml-auto rounded-md mt-8"
      >
        <input
          type="text"
          id="search"
          placeholder="search"
          className="border-none outline-none block bg-transparent w-[250px] text-[#5E5C64] placeholder:text-[#5E5C64] capitalize"
          {...props}
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

export function Wallet() {
  const session = useSession()
  const email = session?.email as string
  const balance = session?.walletBalance as string
  const isVerified = session?.isVerified as boolean

  return (
    <div className="flex flex-col py-5 items-center justify-center gap-1 lg:flex-row md:py-0">
      <div className="bg-[#554957] px-4 rounded-lg py-4 text-center">
        <p className="text-sm text-[#FAEBEB] mb-5">Your Wallet Balance:</p>
        <p className="text-[32px] text-white font-bold">{`N${balance}`}</p>
      </div>
      <div className="flex-col justify-center items-center text-center text-white">
        {isVerified ? (
          <div className="flex items-center justify-center text-[20px] bg-[#EA098D] rounded-full p-1 px-9 mb-[7px]">
            <Image
              src={"/assets/icons/check.svg"}
              alt="check_icon"
              width={30}
              height={30}
            />
            <span style={{ marginLeft: "5px" }}>Account Verified</span>
          </div>
        ) : (
          <button
            type="button"
            className="text-[20px] bg-[#EA098D] rounded-full p-1 px-9 mb-[7px] flex items-center justify-center"
            onClick={() => getPaymentLink(false, 5000)}
          >
            <div style={{ display: "inline-flex", alignItems: "center" }}>
              <Image
                src={"/assets/icons/plus.png"}
                alt="plus_icon"
                width={30}
                height={30}
              />
              <span style={{ marginLeft: "5px" }}>Get Verified</span>
            </div>
          </button>
        )}
        <button
          type="button"
          className="text-[20px] bg-[#6b4b9f] rounded-full p-1 px-9 mb-[7px] flex items-center justify-center"
          onClick={() => getPaymentLink(true, 3000)}
        >
          <div style={{ display: "inline-flex", alignItems: "center" }}>
            <Image
              src={"/assets/icons/plus.png"}
              alt="plus_icon"
              width={30}
              height={30}
            />
            <span style={{ marginLeft: "5px" }}>Add Access Fee</span>
          </div>
        </button>
      </div>
    </div>
  )
}

export function MessageView({
  name,
  timestamp,
  message,
  imgSrc,
}: {
  name: string
  timestamp: string
  message: string
  imgSrc: string
}) {
  return (
    <div className="flex items-start py-2 border-b border-gray-300">
      <div className="pr-4 flex-shrink-0">
        <div className="relative w-10 h-10">
          <Image
            src={imgSrc}
            alt="user"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
      </div>
      <div className="flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-xs text-gray-500 ml-auto">{timestamp}</p>
        </div>
        <div className="text-sm">{message}</div>
      </div>
    </div>
  )
}

export function MessageCard({
  message,
  timeStamp,
  bgColor,
}: {
  message: string
  timeStamp: string
  bgColor: string
}) {
  return (
    <div className="bg-[#443B46] rounded-xl p-3 w-[70%]">
      <div className="text-left text-sm font-medium pb-1 text-white">
        <p>{message}</p>
      </div>
      <div className="text-right text-xs text-gray-500">
        <p>{timeStamp}</p>
      </div>
    </div>
  )
}

export function MessageLabel({
  imgSrc,
  name,
}: {
  imgSrc: string
  name: string
}) {
  return (
    <div className="absolute top-0 left-0 w-full mt-4 ml-4 mr-2 rounded-lg veridaq-gradient text-white z-10 shadow-md p-2 flex flex-grow items-center">
      <div className="mr-4">
        <Image
          src={imgSrc}
          alt="user_icon"
          width={50}
          height={50}
          className="rounded-full"
        />
      </div>
      <div className="font-bold text-lg">{name}</div>
    </div>
  )
}

export function MessageBox() {
  return (
    <div className="absolute bottom-0 left-0 w-full m-5">
      <label className="flex items-center gap-4 gradient-border1 bg-[#38313A] w-full rounded-full">
        <input
          type="text"
          id="chat"
          placeholder="Your Message..."
          className="border-none outline-none block bg-[#38313A] text-white placeholder:text-white capitalize"
        />
        <Image
          src="/assets/icons/icon-send.png"
          width={25}
          height={25}
          className=""
          alt="send_btn"
        />
      </label>
    </div>
  )
}

export function SuccessMessage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src={"/assets/images/checkmark.png"}
        alt="checkmark"
        width={400}
        height={400}
      />
      <p className="text-[24px] font-semibold text-lg p-3 text-center">
        Your Veridaq Request is Successful!
      </p>
    </div>
  )
}

export function ErrorMessage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src={"/assets/images/error.png"}
        alt="checkmark"
        width={400}
        height={400}
      />
      <p className="text-[24px] font-semibold text-lg p-3 text-center">
        Your Veridaq Request is UnSuccessful! Please try again later
      </p>
    </div>
  )
}

export function VeridaqDocument({
  DocDetails,
  DocDate,
  id,
  docId,
  onClick,
}: {
  DocDetails: string
  DocDate: string
  id: string
  docId: string
  onClick: (id: string, docId: string) => void
}) {
  const handleClick = () => {
    onClick(id, docId) // Pass the id to the onClick handler
  }

  return (
    <div
      className="flex flex-col sm:flex-row items-start gap-3 pt-4 pb-4 hover:cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex-shrink-0">
        <Image
          src={"/assets/images/384.png"}
          alt="veridaq_icon"
          width={40}
          height={40}
        />
      </div>
      <div className="flex flex-col items-start">
        <div className="mb-1 sm:mb-0">
          {" "}
          {/* Added margin bottom to separate elements */}
          <p>{DocDetails}</p>
        </div>
        <div className="text-sm">
          {" "}
          {/* Added smaller text size for date */}
          <p>{DocDate}</p>
        </div>
      </div>
    </div>
  )
}

interface StatusMessageProps {
  message: string
  type: "error" | "success"
}

export const StatusMessage: React.FC<StatusMessageProps> = ({
  message,
  type,
}) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 10000) // Message disappears after 3 seconds

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`fixed top-5 right-5 p-3 rounded-md text-white ${
        type === "error" ? "bg-red-500" : "bg-green-500"
      } ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      {message}
    </div>
  )
}

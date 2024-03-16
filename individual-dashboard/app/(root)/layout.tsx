import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth"; // Import Session type

import "./globals.css";

export const metadata: Metadata = {
  title: "My Dashboard",
  description: "Request, receive, and share your Veridaq",
};

// Define props type including session
interface RootLayoutProps {
  children: React.ReactNode;
  session: Session | null; // Specify Session type or null
}

export default function RootLayout({ children, session }: RootLayoutProps) {
  return (
    <SessionProvider session={session}> {/* Provide session to SessionProvider */}
      <html lang="en">
        <body>{children}</body>
      </html>
    </SessionProvider>
  );
}

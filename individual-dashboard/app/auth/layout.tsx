import { Metadata } from "next";
import "../globals.css";

import { Rightsvgs } from "@/components/shared/shared";

export const metadata: Metadata = {
  title: "Auth",
  description: "Sign in to your Individual Dashboard",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-[#38313a]">
        <main className="">
          {children}
          <Rightsvgs />
        </main>
      </body>
    </html>
  );
}

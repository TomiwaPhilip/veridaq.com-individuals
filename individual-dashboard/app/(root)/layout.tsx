import type { Metadata } from "next";
import "../globals.css";

import { Nav, Header } from "@/components/shared/shared";

export const metadata: Metadata = {
  title: "My Dashboard",
  description: "Request, receive, and share your Veridaq",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>    
        <main className="grid grid-rows-[auto] grid-cols-[auto_1fr]">
          <Nav />
          <div className="p-4 bg-[#E1D7E2]">
            <Header />
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}

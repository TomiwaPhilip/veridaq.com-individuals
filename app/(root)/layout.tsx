import type { Metadata, Viewport } from "next";
import "../globals.css";

import BottomBar, { Nav, Header } from "@/components/shared/shared";
import { WhatsAppButton } from "@/components/shared/feedback";

export const metadata: Metadata = {
  applicationName: "Individual Veridaq.com Dashboard",
  title: {
    default: "My Dashboard",
    template: "My Dashboard",
  },
  description: "Request, receive, and share your Veridaq",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "My Dashboard",
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Veridaq.com",
    title: {
      default: "My Dashboard",
      template: "My Dashboard",
    },
    description: "Request, receive, and share your Veridaq",
  },
  twitter: {
    card: "summary",
    title: {
      default: "My Dashboard",
      template: "My Dashboard",
    },
    description: "Request, receive, and share your Veridaq",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>  
        <main className="">
          <Nav />
          <div className="p-8 absolute right-0 lg:left-[230px]">
            <Header/>
            {children}
          </div>
          <WhatsAppButton />
          <BottomBar />
        </main>
      </body>
    </html>
  );
}

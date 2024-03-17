import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}

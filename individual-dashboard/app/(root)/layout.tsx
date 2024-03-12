import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Dashboard",
  description: "Request, recieve, and share your Veridaq",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import { Metadata } from "next";
import "../globals.css";

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
            <img src="/assets/icons/blur.png" alt="blob" className="blob-bottom-right" />
          </main>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TripStory",
  description: "여행을 계획하고, 나만의 여행 일정을 짤 수 있는 서비스",
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} w-full min-h-svh max-w-[430px] mx-auto`}
      >
        {children}
      </body>
    </html>
  );
}

export default RootLayout;

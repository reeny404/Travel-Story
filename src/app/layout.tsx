import type { Metadata } from "next";
import { pretendardFont } from "./../constants/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "TravelStory",
  description: "여행을 계획하고, 나만의 여행 일정을 짤 수 있는 서비스",
  icons: {
    icon: "/travelstory-logo.png",
  },
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pretendardFont.className} w-full min-h-svh max-w-[430px] md:max-w-[1366px] mx-auto`}
      >
        {children}
      </body>
    </html>
  );
}

export default RootLayout;

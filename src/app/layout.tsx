import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const font = localFont({
  src: [{ path: "../fonts/Pretendard_Variable.woff2" }],
});

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
        className={`${font.className} w-full min-h-svh max-w-[430px] mx-auto text-primary`}
      >
        {children}
      </body>
    </html>
  );
}

export default RootLayout;

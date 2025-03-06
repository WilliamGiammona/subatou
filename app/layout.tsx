import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Suba Corp TOU",
  description: "Suba Corporation Terms of Use Document",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} overflow-hidden m-0 p-0 h-full w-full`}
      >
        {children}
      </body>
    </html>
  );
}

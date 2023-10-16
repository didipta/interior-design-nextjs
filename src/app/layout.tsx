import Mainlayout from "@/components/Main/Mainlayout";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/lib/Provider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Artistry",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className=" container mx-auto">
        <Providers>{children}</Providers>

        <Toaster />
      </body>
    </html>
  );
}

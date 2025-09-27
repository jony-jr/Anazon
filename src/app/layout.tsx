import type { Metadata } from "next";
import { Geist, Geist_Mono, Josefin_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./_Components/Navbar/Navbar";
import { Toaster } from "sonner";
import MySessionProvidor from "./_Components/MySessionProvider/MySessionProvidor";
import { Footer } from "./_Components/Footer/Footer";
import { getServerSession } from "next-auth";
import { getUsetWishList } from "@/app/_Services/wishList.service";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: "900",
});

export const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  preload: false,
});

export const metadata: Metadata = {
  title: "Home",
  description: "Anazon shop smart, Live better",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch session and wishlist server-side
  // const session = await getServerSession();
  // const initialWishesIds = session ? await getUsetWishList().catch(() => []) : [];

  return (
    <html lang="en" className="">
      <body className={`${geistSans.className} antialiased`}>
        <MySessionProvidor>
          <div className="overflow-auto">
            <Navbar />
            <div className="mt-20 sm:mt-22">{children}</div>
            <Toaster position="top-right" duration={2000} />
            <Footer />
          </div>
        </MySessionProvidor>
      </body>
    </html>
  );
}

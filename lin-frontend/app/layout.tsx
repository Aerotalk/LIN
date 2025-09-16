import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Get low rate personal loans within minutes | LoanINNeed",
  description:
    "Get ₹5000 - ₹1L personal payday loans at a low rate of interest. Have a CIBIL less than 700, no issue we offer loans at CIBIL starting from 650+. Apply now!",
  keywords: [
    "low rate loan",
    "personal loan with low interest",
    "Insta personal loan",
    "payday loan with low interest",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

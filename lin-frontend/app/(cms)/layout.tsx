import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { outfit } from "@/lib/fonts";

export const metadata: Metadata = {
    title: "Careers & Blog | LoanINNeed",
    description: "Explore career opportunities and read our latest updates.",
};

export default function CmsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${outfit.className} antialiased`}>
                <Navbar />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}

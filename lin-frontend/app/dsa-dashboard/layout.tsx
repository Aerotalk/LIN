import type { Metadata } from "next";
import "../globals.css";
import { outfit } from "@/lib/fonts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Direct Sales Agent Dashboard | LoanINNeed",
    description: "Manage your Direct Sales Agent earnings and performance.",
};

export default function DSADashboardLayout({
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

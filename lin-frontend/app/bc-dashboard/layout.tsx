import type { Metadata } from "next";
import "../globals.css";
import { outfit } from "@/lib/fonts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Business Consultant Dashboard | LoanINNeed",
    description: "Manage your Business Consultant earnings and performance.",
};

export default function BCDashboardLayout({
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

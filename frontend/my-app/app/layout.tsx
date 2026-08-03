import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/app/components/Navbar";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Personal Book Manager",
  description: "Manage your reading journey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={inter.className}>
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
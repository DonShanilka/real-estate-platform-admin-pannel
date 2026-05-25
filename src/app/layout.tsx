import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/src/providers/ReduxProvider";
import { Sidebar } from "../components/layout/Sidebar";
import { AdminLayoutShell } from "../components/layout/AdminLayoutShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Real Estate Admin Panel",
  description:
    "Management dashboard for properties, users, and financial analytics",
};

export default function RootLayout({children,}: Readonly<{  children: React.ReactNode}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-zinc-50 text-zinc-800">
        {/* <Sidebar/> */}
        <ReduxProvider>
          <AdminLayoutShell>{children}</AdminLayoutShell>
        </ReduxProvider>
      </body>
    </html>
  );
}

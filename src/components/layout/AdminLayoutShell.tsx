"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface AdminLayoutShellProps {
  children: React.ReactNode;
}

export function AdminLayoutShell({ children }: AdminLayoutShellProps) {
  const pathname = usePathname();

  // Authentication pages should not display the admin layout.
  if (pathname.startsWith("/auth/")) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white font-sans text-black">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Application */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden bg-white">
        {/* Header */}
        <Header />

        {/* Route Content */}
        <main className="flex-1 overflow-y-auto bg-white p-5 text-black sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

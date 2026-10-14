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
    <div className="flex h-dvh w-screen overflow-hidden bg-white font-sans text-black">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Application */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-white">
        {/* Header */}
        <div className="shrink-0">
          <Header />
        </div>

        {/* Scrollable Route Content */}
        <main className="flex min-h-0 flex-1 flex-col overflow-hidden bg-white px-5 py-3 text-black sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}

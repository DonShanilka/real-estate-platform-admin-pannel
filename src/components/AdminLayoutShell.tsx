"use client";

import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface AdminLayoutShellProps {
  children: React.ReactNode;
}

export function AdminLayoutShell({ children }: AdminLayoutShellProps) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-50 dark:bg-black font-sans">
      {/* Permanent Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area Container */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Persistent Top Header */}
        <Header />

        {/* Dynamic Nested Route Content Page */}
        <main className="flex-1 overflow-y-auto bg-zinc-50 dark:bg-zinc-950 p-6 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

'use client';

import { ReactNode } from 'react';
import Image from 'next/image';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-10 h-10 bg-gradient-to-r from-rose-600 to-amber-500 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">🏠</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">RealEstate Pro</h1>
          </div>

          <h2 className="text-3xl font-semibold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600 mb-8">Admin Portal</p>

          {children}
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-rose-600 via-amber-500 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white max-w-lg">
            <div className="text-4xl font-bold mb-6 leading-tight">
              Manage Properties with Confidence
            </div>
            <p className="text-xl opacity-90">
              Professional real estate management platform for admins and agents.
            </p>

            <div className="mt-12 border-l-4 border-white/50 pl-6">
              <p className="italic text-lg">
                "Best real estate admin panel I've used. Clean, fast and powerful."
              </p>
              <p className="mt-3 text-sm opacity-75">- Sarah Chen, CEO at Luxe Homes</p>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-10 right-10 bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
          <div className="flex gap-8 text-white">
            <div>
              <div className="text-3xl font-bold">248</div>
              <div className="text-sm opacity-75">Properties</div>
            </div>
            <div>
              <div className="text-3xl font-bold">87</div>
              <div className="text-sm opacity-75">Active Deals</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import { DynamicWidget, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const isLoggedIn = useIsLoggedIn();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-semibold text-gray-900 hover:text-gray-700">
              Dynamic NFT Demo
            </Link>
            {mounted && isLoggedIn && (
              <nav className="hidden md:flex space-x-6">
                <Link 
                  href="/mint" 
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  🚀 Mint NFT
                </Link>
              </nav>
            )}
          </div>
          <div className="flex items-center">
            <DynamicWidget />
          </div>
        </div>
      </div>
    </header>
  );
}

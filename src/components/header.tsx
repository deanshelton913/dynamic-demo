"use client";

import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">
              Dynamic NFT Demo
            </h1>
          </div>
          <div className="flex items-center">
            <DynamicWidget />
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";

import { useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";

export default function Home() {
  const { user } = useDynamicContext();
  const isLoggedIn = useIsLoggedIn();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Dynamic NFT Minting Demo
        </h1>
        <p className="text-center text-lg text-gray-300 mb-8">
          Gasless NFT minting powered by Dynamic and ZeroDev
        </p>
        
        {isLoggedIn && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-900">Auth Details</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">User Info:</h3>
                <pre className="bg-white p-3 rounded border text-xs overflow-auto text-gray-900">
                  {JSON.stringify(user, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

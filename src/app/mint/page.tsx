"use client";

import NFTMintGasless from "@/components/nft-mint-gasless";
import { useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MintPage() {
  const { user, sdkHasLoaded } = useDynamicContext();
  const isLoggedIn = useIsLoggedIn();
  const router = useRouter();

  useEffect(() => {
    if (!sdkHasLoaded) return; // Still loading SDK

    if (!isLoggedIn || !user) {
      router.push("/"); // Redirect to home if not authenticated
      return;
    }
  }, [isLoggedIn, user, sdkHasLoaded, router]);

  // Show loading state while checking authentication
  if (!sdkHasLoaded) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading Dynamic SDK...</p>
          </div>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!isLoggedIn || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Gasless NFT Minting
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mint your unique NFT to the Polygon blockchain with gas fees sponsored by ZeroDev.
            No MATIC tokens required - we'll cover the gas fees for you!
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <NFTMintGasless />
        </div>

        <div className="max-w-md mx-auto mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">About Gas Sponsorship</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <p>
              <strong>Sponsored by:</strong> ZeroDev Paymaster
            </p>
            <p>
              <strong>Contract:</strong> DynamicNFT (DNFT)
            </p>
            <p>
              <strong>Standard:</strong> ERC-721
            </p>
            <p>
              <strong>Network:</strong> Polygon Mainnet
            </p>
            <p>
              <strong>Gas Fees:</strong> Sponsored (No cost to you!)
            </p>
            <p>
              <strong>Features:</strong> Unique metadata, on-chain storage
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

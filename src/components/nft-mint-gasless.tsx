"use client";

import { useState, useEffect } from "react";
import { 
  useDynamicContext, 
  useIsLoggedIn
} from "@dynamic-labs/sdk-react-core";
import { isEthereumWallet } from "@dynamic-labs/ethereum";
import { isZeroDevConnector } from "@dynamic-labs/ethereum-aa";
import { CONTRACT_ADDRESS, CONTRACT_ABI, generateMetadataUri, formatContractError } from "@/lib/contract";


export default function NFTMintGasless() {
  const { user, primaryWallet } = useDynamicContext();
  const isLoggedIn = useIsLoggedIn();
  const [metadataUri, setMetadataUri] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Generate metadata URI when component mounts or wallet changes
  useEffect(() => {
    if (primaryWallet?.address) {
      const uri = generateMetadataUri(Date.now(), primaryWallet.address);
      setMetadataUri(uri);
    }
  }, [primaryWallet?.address]);

  const mintNFTGasless = async (): Promise<string> => {
    if (!primaryWallet?.address || !metadataUri) {
      throw new Error("Wallet not connected or metadata not ready");
    }

    if (!primaryWallet) {
      throw new Error("Wallet not connected");
    }

    try {
      setIsLoading(true);
      setError(null);

      if (!isEthereumWallet(primaryWallet)) {
        throw new Error("Wallet not connected or not EVM compatible");
      }

      const walletClient = await primaryWallet.getWalletClient();
      
      if (!walletClient) {
        throw new Error("Wallet client not available. Please ensure your wallet is properly connected.");
      }

      // Use writeContract for transaction
      const userOpHash = await walletClient.writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "mintTo",
        args: [primaryWallet.address as `0x${string}`, metadataUri],
      });

      // For ZeroDev connectors, wait for user operation receipt to get actual transaction hash
      const connector = primaryWallet.connector;
      if (connector && isZeroDevConnector(connector)) {
        const kernelClient = connector.getAccountAbstractionProvider();
        if (kernelClient) {
          const receipt = await kernelClient.waitForUserOperationReceipt({ hash: userOpHash });
          const actualTxHash = receipt.receipt.transactionHash;
          setTxHash(actualTxHash);
          return actualTxHash;
        }
      }

      // For non-ZeroDev wallets, use the user operation hash
      setTxHash(userOpHash);
      return userOpHash;
      
    } catch (e: unknown) {
      console.error("Gasless minting failed:", e);
      const errorMessage = formatContractError(e);
      setError(errorMessage);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const handleMint = async () => {
    try {
      // Reset any previous error state
      setError(null);
      setTxHash(null);
      
      console.log("Starting mint, isLoading:", isLoading);
      await mintNFTGasless();
      console.log("Mint completed, isLoading should be false");
    } catch (error) {
      // Error is already handled in mintNFTGasless
      // Ensure loading state is reset even on error
      console.log("Mint error, setting isLoading to false");
      setIsLoading(false);
    }
  };

  if (!isLoggedIn || !user) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-700 mb-2">🔐 Sign In Required</h2>
        <p className="text-gray-600">Please log in to connect your wallet and mint NFTs.</p>
      </div>
    );
  }

  if (!primaryWallet) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-blue-700 mb-2">🔗 Connect Wallet</h2>
        <p className="text-blue-600">Please connect your wallet to mint NFTs.</p>
      </div>
    );
  }

  const isZeroDevConnected = primaryWallet?.connector && isZeroDevConnector(primaryWallet.connector);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">🚀 Mint Your Dynamic NFT</h2>
      
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-2">Contract Info</h3>
        <p className="text-sm text-gray-600">
          <strong>Address:</strong> {CONTRACT_ADDRESS}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Network:</strong> Polygon Mainnet (Chain ID: 137)
        </p>
        <p className="text-sm text-gray-600">
          <strong>Gasless:</strong> {isZeroDevConnected ? "✅ ZeroDev Enabled" : "❌ Standard Wallet"}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-2">Wallet Status</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p><strong>Connected:</strong> {primaryWallet ? "Yes" : "No"}</p>
          <p><strong>Address:</strong> {primaryWallet?.address || "Not connected"}</p>
          <p><strong>Network:</strong> {primaryWallet?.connector?.connectedChain || "Unknown"}</p>
          <p><strong>Connector Type:</strong> {primaryWallet?.connector?.name || "Unknown"}</p>
          <p><strong>ZeroDev Enabled:</strong> {isZeroDevConnected ? "Yes" : "No"}</p>
        </div>
      </div>

      <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="font-semibold text-green-700 mb-2">🎉 ZeroDev Gasless Ready!</h3>
        <p className="text-sm text-green-600">
          Your wallet is connected through ZeroDev. This transaction will be gasless!
        </p>
      </div>

      <button
        onClick={handleMint}
        disabled={isLoading || !primaryWallet?.address || !metadataUri}
        className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
          isLoading || !primaryWallet?.address || !metadataUri
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-green-600 text-white hover:bg-green-700"
        }`}
      >
        {isLoading ? `Minting...` : "Mint NFT"}
      </button>

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-4 rounded-lg bg-red-50 border border-red-200">
          <h3 className="font-semibold mb-2 text-red-700">❌ Minting Failed</h3>
          <p className="text-sm text-red-600">
            <strong>Error:</strong> {error}
          </p>
        </div>
      )}

      {/* Success Display */}
      {txHash && (
        <div className="mt-4 p-4 rounded-lg bg-green-50 border border-green-200">
          <h3 className="font-semibold mb-2 text-green-700">✅ Minting Successful!</h3>
          <div className="text-sm text-green-600 space-y-1">
            <p><strong>Transaction Hash:</strong> {txHash}</p>
            <p><strong>Gasless:</strong> {isZeroDevConnected ? "Yes (ZeroDev)" : "No (Standard Wallet)"}</p>
            <p><strong>View on Polygonscan:</strong> 
              <a 
                href={`https://polygonscan.com/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline ml-1"
              >
                {txHash}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

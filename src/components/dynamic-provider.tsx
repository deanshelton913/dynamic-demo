"use client";

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core"; 
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum"; 
import { ZeroDevSmartWalletConnectors } from "@dynamic-labs/ethereum-aa";

export default function DynamicProvider({ children }: React.PropsWithChildren) {
  return (
    <DynamicContextProvider
      settings={{
        // Environment ID: Unique identifier for your Dynamic project
        // This connects your app to your Dynamic dashboard and configuration
        environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID || 'c66ba0c7-7cb3-48fc-aa22-f6fc84c29d75',
        
        // Wallet Connectors: Defines which wallet types are available to users
        // EthereumWalletConnectors: Traditional wallets (MetaMask, WalletConnect, etc.)
        // ZeroDevSmartWalletConnectors: Account abstraction wallets for gasless transactions
        walletConnectors: [EthereumWalletConnectors, ZeroDevSmartWalletConnectors],
        
        // Event Handlers: Respond to authentication events
        events: {
          onAuthSuccess: async (event) => {
            console.log('Dynamic authentication successful:', event);
          },
          onLogout: async (event) => {
            console.log('Dynamic logout successful:', event);
          },
        },
      }}
    >
      {children}
    </DynamicContextProvider>
  );
}

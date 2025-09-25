// Contract configuration and utilities
export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

// DynamicNFT Contract ABI
export const CONTRACT_ABI = [
  {
    "inputs": [],
    "name": "DynamicNFT",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "uri",
        "type": "string"
      }
    ],
    "name": "mintTo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "uri",
        "type": "string"
      }
    ],
    "name": "safeMint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCurrentTokenId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// Generate metadata URI for NFT
export function generateMetadataUri(timestamp: number, walletAddress: string): string {
  const metadata = {
    name: `Dynamic NFT #${timestamp}`,
    description: `A unique NFT minted through Dynamic's gasless infrastructure`,
    image: "https://via.placeholder.com/400x400/4F46E5/FFFFFF?text=Dynamic+NFT",
    attributes: [
      {
        trait_type: "Minted At",
        value: new Date(timestamp).toISOString()
      },
      {
        trait_type: "Minter",
        value: walletAddress
      },
      {
        trait_type: "Platform",
        value: "Dynamic"
      },
      {
        trait_type: "Gasless",
        value: "Yes"
      }
    ]
  };

  // For demo purposes, we'll use a data URI
  // In production, you'd upload this to IPFS or a metadata service
  return `data:application/json;base64,${btoa(JSON.stringify(metadata))}`;
}

// Format contract errors for user display
export function formatContractError(error: unknown): string {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    
    if (message.includes('user rejected')) {
      return 'Transaction was cancelled by user';
    }
    if (message.includes('insufficient funds')) {
      return 'Insufficient funds for transaction';
    }
    if (message.includes('gas')) {
      return 'Gas estimation failed. Please try again.';
    }
    if (message.includes('network')) {
      return 'Network error. Please check your connection.';
    }
    if (message.includes('contract')) {
      return 'Contract interaction failed. Please try again.';
    }
    
    return error.message;
  }
  
  return 'An unknown error occurred';
}

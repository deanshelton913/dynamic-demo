# Dynamic NFT Contract

Simple ERC721 NFT contract for the Dynamic demo app.

## Contract Features

- **ERC721 Standard**: Full ERC721 implementation with metadata support
- **URI Storage**: Each token can have a unique metadata URI
- **Owner Functions**: `safeMint()` for owner-only minting
- **Public Minting**: `mintTo()` for public minting
- **Supply Tracking**: `totalSupply()` and `getCurrentTokenId()` functions

## Deployment

### Prerequisites

1. Install Foundry: https://book.getfoundry.sh/getting-started/installation
2. Set up environment variables in `.env.local`:
   ```bash
   DEPLOY_CONTRACT_PRIVATE_KEY=your_private_key_here
   POLYGONSCAN_API_KEY=your_polygonscan_api_key_here
   NEXT_PUBLIC_POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/your_key
   ```

### Deploy to Polygon

```bash
# Build the contract
npm run contracts:build

# Deploy to Polygon Mainnet
npm run contracts:deploy:polygon
```

### After Deployment

1. Copy the deployed contract address
2. Update `NEXT_PUBLIC_CONTRACT_ADDRESS` in your `.env.local`
3. Restart your Next.js app

## Contract Functions

- `safeMint(address to, string memory uri)` - Owner-only minting
- `mintTo(address to, string memory uri)` - Public minting
- `totalSupply()` - Get total number of minted tokens
- `getCurrentTokenId()` - Get next token ID to be minted
- `tokenURI(uint256 tokenId)` - Get metadata URI for a token


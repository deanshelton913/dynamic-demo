#!/bin/bash

# Create .env.local file with the provided secrets
cat > .env.local << 'EOF'
# Dynamic Configuration
NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID=c66ba0c7-7cb3-48fc-aa22-f6fc84c29d75

# ZeroDev Configuration
NEXT_PUBLIC_ZERODEV_PROJECT_ID=87ddc4b2-d2d4-4149-acef-004010b60719

# Polygon Network
NEXT_PUBLIC_POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/48Twle3AsWtp-w2Mtj9Wv

# Contract Configuration (we'll add this when we deploy the contract)
NEXT_PUBLIC_CONTRACT_ADDRESS=your_nft_contract_address_here
EOF

echo "✅ Created .env.local file with your secrets"
echo "📝 Remember to update NEXT_PUBLIC_CONTRACT_ADDRESS when you deploy the contract"

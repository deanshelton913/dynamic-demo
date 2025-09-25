
## Improvement Suggestions

### 1. Missing Type Exports for Core Wallet Methods

**Problem**: The `getWalletClient()` method exists on `EthereumWallet` instances but is not properly typed in the public API.

**Error**: 
```
Property 'getWalletClient' does not exist on type 'Wallet<WalletConnector>'
```

**Location**: 
- File: `src/components/nft-mint-gasless.tsx`
- Line: `const walletClient = await primaryWallet.getWalletClient();`

**Root Cause**: 
- The `EthereumWallet` class is not exported from `@dynamic-labs/ethereum`
- Only `isEthereumWallet` function is exported, but not the actual wallet class
- The `primaryWallet` from `useDynamicContext()` is typed as `Wallet<WalletConnector>` instead of the more specific `EthereumWallet` type

**Current Workaround**:
```typescript
const ethereumWallet = primaryWallet as any;
const walletClient = await ethereumWallet.getWalletClient();
```

# From the Baseline - BlockDAG dApp Setup Guide

## Overview
This is a production-ready BlockDAG dApp that mirrors your Android tennis app with on-chain match data, live SofaScore integration, and wallet-required authentication.

## Prerequisites
- Node.js 16+ installed
- npm or yarn
- BlockDAG wallet (MetaMask with BlockDAG network added)
- BDAG tokens for deployment gas fees
- Private key for deployment (yours: 0xb645F864600d47f7d35cd4155122b6D20EAC67F4)

## Step 1: Setup

```bash
# Navigate to the dApp directory
cd BlockDAG_dApp

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

## Step 2: Configure Environment

Edit `.env`:
```
REACT_APP_RPC_URL=https://rpc.blockdag.works
REACT_APP_CHAIN_ID=1404
PRIVATE_KEY=your_private_key_here  # The key that controls your 0xb645...
```

⚠️ **NEVER commit your private key to git!** Add `.env` to `.gitignore` immediately.

## Step 3: Deploy Smart Contract

The `TennisMatches.sol` contract stores all match data on-chain with admin controls.

```bash
# Deploy to BlockDAG mainnet
npm run deploy
```

The script will output your deployed contract address:
```
✅ Contract deployed to: 0x...
```

Copy this address to your `.env`:
```
REACT_APP_CONTRACT_ADDRESS=0x...
```

## Step 4: Build the dApp

```bash
# Build for production
npm run build

# This creates an optimized build in the `build/` folder
```

## Step 5: Deploy Frontend

You can host the dApp on:

### Option A: Vercel (Recommended)
```bash
npm install -g vercel
vercel
```
Follow prompts and link to your GitHub repo.

### Option B: Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

### Option C: Traditional Hosting
Upload the `build/` folder to any web host (AWS, GoDaddy, etc).

## Step 6: Test Locally

```bash
npm start
```

Opens http://localhost:3000. Connect your MetaMask wallet and verify:
- ✅ Wallet connection works
- ✅ BlockDAG network is correct (Chain ID: 1404)
- ✅ Contract data loads
- ✅ Live SofaScore scores update

## Project Structure

```
BlockDAG_dApp/
├── contracts/
│   └── TennisMatches.sol       # Smart contract (Solidity)
├── scripts/
│   └── deploy.js               # Deployment script
├── src/
│   ├── App.jsx                 # Main app component
│   ├── App.css                 # Styling
│   └── components/
│       ├── WalletConnect.jsx   # Wallet authentication
│       ├── ResultsTab.jsx      # Live scores
│       ├── RankingsTab.jsx     # Player rankings
│       ├── PodcastTab.jsx      # Podcast episodes
│       └── AboutTab.jsx        # About page
├── package.json
├── hardhat.config.js           # Hardhat config
└── .env.example                # Environment template
```

## Smart Contract Functions

### Admin Only:
- `addMatch()` — Add a new match to the blockchain
- `updateMatch()` — Update match scores, status, live state
- `changeAdmin()` — Transfer admin rights to another address

### Public (Anyone):
- `getMatch(id)` — Retrieve a single match by ID
- `getAllMatches()` — Retrieve all matches
- `getMatchCount()` — Get total match count

## Updating Match Data

Since data comes from SofaScore, you have two options:

### Option 1: Manual Updates (You call contract functions)
Use BlockDAG Explorer or a tool like Etherscan to call `updateMatch()` and sync scores.

### Option 2: Automated Backend (Future)
Build a backend service that:
1. Polls SofaScore API
2. Detects changes
3. Calls `updateMatch()` automatically

This keeps on-chain data current without manual intervention.

## Future Blockchain Features

Once the basic dApp is live, you can add:
- 🎰 **Betting**: Predict match outcomes for BDAG rewards
- 🏅 **NFT Cards**: Tokenize player achievements
- 🗳️ **DAO Voting**: Community votes on player awards
- 💰 **Staking**: Lock BDAG to earn platform fees

## Troubleshooting

**Wallet won't connect?**
- Ensure MetaMask is installed
- Add BlockDAG network manually if needed:
  - RPC: https://rpc.blockdag.works
  - Chain ID: 1404
  - Currency: BDAG
  - Explorer: https://explorer.blockdag.works

**Contract deploy fails?**
- Check you have BDAG in your wallet for gas
- Verify PRIVATE_KEY is set correctly in .env
- Ensure node is running and synced

**Live scores not updating?**
- SofaScore API may be rate-limited
- Wait a few minutes and refresh
- Check browser console for errors

## Support

For BlockDAG-specific issues:
- Docs: https://docs.blockdag.works/
- Explorer: https://explorer.blockdag.works/

For dApp issues, check the console (F12) for error messages.

## Next Steps

1. ✅ Deploy contract
2. ✅ Host frontend
3. 🔄 Set up backend to auto-update match data
4. 🎯 Add blockchain features (betting, NFTs, DAO)
5. 📣 Launch publicly on mainnet

Good luck, and enjoy building on BlockDAG! 🚀

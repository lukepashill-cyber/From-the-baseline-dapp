import React, { useState } from 'react';
import { ethers } from 'ethers';

const CHAIN_ID = 1404;
const CHAIN_ID_HEX = '0x57c';
const RPC_URL = 'https://rpc.blockdag.works';

export default function WalletConnect({ onConnect }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!window.ethereum) {
        setError('MetaMask or BlockDAG wallet not detected. Please install it.');
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const currentChainId = await window.ethereum.request({
        method: 'eth_chainId',
      });

      if (currentChainId !== CHAIN_ID_HEX) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: CHAIN_ID_HEX }],
          });
        } catch (switchError) {
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: CHAIN_ID_HEX,
                  chainName: 'BlockDAG',
                  rpcUrls: [RPC_URL],
                  nativeCurrency: {
                    name: 'BDAG',
                    symbol: 'BDAG',
                    decimals: 18,
                  },
                  blockExplorerUrls: ['https://explorer.blockdag.works'],
                },
              ],
            });
          }
        }
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAccount = accounts[0];

      onConnect(provider, signer, userAccount);
    } catch (err) {
      console.error('Wallet connection error:', err);
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wallet-connect-container">
      <div className="wallet-connect-card">
        <h1>From the Baseline</h1>
        <p className="subtitle">LIVE: British Tennis on BlockDAG</p>

        <div className="tennis-icon">🎾</div>

        <h2>Connect Your Wallet</h2>
        <p className="description">
          Connect your BlockDAG wallet to access live tennis scores, rankings, and more.
        </p>

        {error && <div className="error-message">{error}</div>}

        <button
          onClick={connectWallet}
          disabled={loading}
          className="connect-button"
        >
          {loading ? 'Connecting...' : 'Connect Wallet'}
        </button>

        <div className="info-box">
          <h3>Requirements:</h3>
          <ul>
            <li>MetaMask or BlockDAG wallet extension</li>
            <li>Connected to BlockDAG mainnet (Chain ID: 1404)</li>
            <li>BDAG tokens for gas fees</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

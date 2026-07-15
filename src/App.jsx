import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import TennisMatches from './contracts/TennisMatches.json';
import WalletConnect from './components/WalletConnect';
import ResultsTab from './components/ResultsTab';
import RankingsTab from './components/RankingsTab';
import PodcastTab from './components/PodcastTab';
import AboutTab from './components/AboutTab';
import './App.css';

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
const RPC_URL = 'https://rpc.blockdag.works';
const CHAIN_ID = 1404;

export default function App() {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [matches, setMatches] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (connected && contract) {
      fetchMatches();
    }
  }, [connected, contract]);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const allMatches = await contract.getAllMatches();
      setMatches(allMatches);
      setError(null);
    } catch (err) {
      console.error('Error fetching matches:', err);
      setError('Failed to load matches');
    } finally {
      setLoading(false);
    }
  };

  const handleWalletConnect = async (provider, signer, userAccount) => {
    try {
      const contractInstance = new ethers.Contract(
        CONTRACT_ADDRESS,
        TennisMatches.abi,
        signer
      );
      setContract(contractInstance);
      setAccount(userAccount);
      setConnected(true);
    } catch (err) {
      console.error('Error connecting to contract:', err);
      setError('Failed to connect to contract');
    }
  };

  const handleDisconnect = () => {
    setConnected(false);
    setAccount(null);
    setContract(null);
    setMatches([]);
  };

  if (!connected) {
    return <WalletConnect onConnect={handleWalletConnect} />;
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>From the Baseline</h1>
          <p>LIVE: British Tennis Overview</p>
        </div>
        <div className="account-info">
          <span>{account?.slice(0, 6)}...{account?.slice(-4)}</span>
          <button onClick={handleDisconnect} className="disconnect-btn">Disconnect</button>
        </div>
      </header>

      {error && <div className="error-banner">{error}</div>}

      <div className="content">
        {selectedTab === 0 && <ResultsTab matches={matches} loading={loading} onRefresh={fetchMatches} />}
        {selectedTab === 1 && <RankingsTab />}
        {selectedTab === 2 && <PodcastTab />}
        {selectedTab === 3 && <AboutTab />}
      </div>

      <nav className="bottom-nav">
        <button className={selectedTab === 0 ? 'active' : ''} onClick={() => setSelectedTab(0)}>
          🎾 Results
        </button>
        <button className={selectedTab === 1 ? 'active' : ''} onClick={() => setSelectedTab(1)}>
          📊 Rankings
        </button>
        <button className={selectedTab === 2 ? 'active' : ''} onClick={() => setSelectedTab(2)}>
          🎙️ Podcast
        </button>
        <button className={selectedTab === 3 ? 'active' : ''} onClick={() => setSelectedTab(3)}>
          ℹ️ About
        </button>
      </nav>
    </div>
  );
}

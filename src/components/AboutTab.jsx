import React from 'react';

export default function AboutTab() {
  return (
    <div className="about-tab">
      <div className="about-header">
        <h1>From the Baseline</h1>
        <p className="tagline">LIVE: British Tennis on BlockDAG</p>
      </div>

      <div className="about-content">
        <section>
          <h2>About the App</h2>
          <p>
            From the Baseline is a decentralized tennis app built on the BlockDAG network.
            Get live scores, rankings, and podcast episodes for British tennis players.
          </p>
        </section>

        <section>
          <h2>Features</h2>
          <ul>
            <li>🎾 Live tennis scores (powered by SofaScore)</li>
            <li>📊 Player rankings (ATP, WTA, Doubles)</li>
            <li>🎙️ Podcast episodes from Spotify</li>
            <li>🔗 Blockchain-verified match data</li>
          </ul>
        </section>

        <section>
          <h2>Follow Us</h2>
          <div className="social-links">
            <a href="https://instagram.com/fromthebaseline" target="_blank" rel="noopener noreferrer">
              📷 Instagram
            </a>
            <a href="https://facebook.com/fromthebaseline" target="_blank" rel="noopener noreferrer">
              👥 Facebook
            </a>
            <a href="https://twitter.com/fromthebaseline" target="_blank" rel="noopener noreferrer">
              𝕏 Twitter
            </a>
            <a href="https://open.spotify.com/show/FROM_THE_BASELINE_ID" target="_blank" rel="noopener noreferrer">
              🎙️ Spotify
            </a>
          </div>
        </section>

        <section>
          <h2>App Created by WelshDag</h2>
          <p style={{ fontSize: '12px', color: '#888' }}>
            BlockDAG dApp version built with React & Solidity
          </p>
        </section>
      </div>
    </div>
  );
}

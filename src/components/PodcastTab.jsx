import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SPOTIFY_RSS_URL = 'https://open.spotify.com/show/YOUR_SHOW_ID/rss';

export default function PodcastTab() {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const fetchEpisodes = async () => {
    try {
      setLoading(true);
      // Parse RSS feed (you'll need to replace with actual Spotify RSS URL)
      const response = await axios.get(SPOTIFY_RSS_URL);
      // Parse XML and extract episodes
      setEpisodes([
        {
          id: 1,
          title: 'Wimbledon 2026 Preview',
          description: 'A look ahead at the upcoming Wimbledon championship',
          pubDate: '2026-07-10',
          link: '#',
        },
        {
          id: 2,
          title: 'British Tennis Rising Stars',
          description: 'Interview with emerging British tennis talent',
          pubDate: '2026-07-08',
          link: '#',
        },
      ]);
    } catch (error) {
      console.error('Error fetching episodes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="podcast-tab">
      <div className="podcast-header">
        <h2>From the Baseline Podcast</h2>
        <p>Latest episodes</p>
      </div>

      <div className="episodes-list">
        {loading ? (
          <div className="loading">Loading episodes...</div>
        ) : (
          episodes.map(episode => (
            <div key={episode.id} className="episode-card">
              <div className="episode-date">{episode.pubDate}</div>
              <h3>{episode.title}</h3>
              <p>{episode.description}</p>
              <a href={episode.link} target="_blank" rel="noopener noreferrer" className="listen-btn">
                Listen on Spotify
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

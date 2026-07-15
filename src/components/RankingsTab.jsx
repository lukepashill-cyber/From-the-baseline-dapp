import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SOFASCORE_BASE_URL = 'https://api.sofascore.com/api/v1';

export default function RankingsTab() {
  const [rankings, setRankings] = useState([]);
  const [category, setCategory] = useState(0);
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: 0, name: "Men's Singles", url: 'https://www.sofascore.com/tennis/standings/atp/men-single-ranking' },
    { id: 1, name: "Women's Singles", url: 'https://www.sofascore.com/tennis/standings/wta/women-single-ranking' },
    { id: 2, name: "Men's Doubles", url: 'https://www.sofascore.com/tennis/standings/atp/men-double-ranking' },
    { id: 3, name: "Women's Doubles", url: 'https://www.sofascore.com/tennis/standings/wta/women-double-ranking' },
  ];

  useEffect(() => {
    fetchRankings();
  }, [category]);

  const fetchRankings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(categories[category].url);
      // Parse rankings from the page (simplified mock for now)
      setRankings([
        { rank: 1, name: 'Jack Draper', country: '🇬🇧', points: 5250 },
        { rank: 2, name: 'Katie Boulter', country: '🇬🇧', points: 4890 },
        { rank: 3, name: 'Dan Evans', country: '🇬🇧', points: 3420 },
        { rank: 4, name: 'Heather Watson', country: '🇬🇧', points: 2890 },
      ]);
    } catch (error) {
      console.error('Error fetching rankings:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rankings-tab">
      <div className="category-tabs">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            className={category === idx ? 'active' : ''}
            onClick={() => setCategory(idx)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="rankings-list">
        {loading ? (
          <div className="loading">Loading rankings...</div>
        ) : (
          rankings.map(player => (
            <div key={player.rank} className="ranking-row">
              <span className="rank">#{player.rank}</span>
              <span className="name">{player.country} {player.name}</span>
              <span className="points">{player.points} pts</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SOFASCORE_BASE_URL = 'https://api.sofascore.com/api/v1';

export default function ResultsTab({ matches, loading, onRefresh }) {
  const [liveMatches, setLiveMatches] = useState([]);
  const [filter, setFilter] = useState(0);
  const [sofaScoreData, setSofaScoreData] = useState({});

  useEffect(() => {
    fetchLiveScoresFromSofaScore();
  }, []);

  const fetchLiveScoresFromSofaScore = async () => {
    try {
      const response = await axios.get(`${SOFASCORE_BASE_URL}/sport/tennis/events/live`);
      const data = {};
      response.data.events?.forEach(event => {
        data[event.id] = {
          homeScore: event.homeScore?.display || '0',
          awayScore: event.awayScore?.display || '0',
          homePoint: event.homeScore?.point || '',
          awayPoint: event.awayScore?.point || '',
          isLive: event.status?.type === 'inprogress',
        };
      });
      setSofaScoreData(data);
    } catch (error) {
      console.error('Error fetching live scores:', error);
    }
  };

  const filterMatches = () => {
    let result = matches;
    if (filter === 1) result = result.filter(m => m.isLive);
    if (filter === 2) result = result.filter(m => m.category.includes('ATP') || m.category.includes('WTA'));
    if (filter === 3) result = result.filter(m => m.category.includes('ITF') || m.category.includes('Challenger'));
    return result;
  };

  return (
    <div className="results-tab">
      <div className="filters">
        <button className={filter === 0 ? 'active' : ''} onClick={() => setFilter(0)}>
          All
        </button>
        <button className={filter === 1 ? 'active' : ''} onClick={() => setFilter(1)}>
          Live
        </button>
        <button className={filter === 2 ? 'active' : ''} onClick={() => setFilter(2)}>
          ATP/WTA
        </button>
        <button className={filter === 3 ? 'active' : ''} onClick={() => setFilter(3)}>
          Challenger/ITF
        </button>
      </div>

      <button onClick={onRefresh} disabled={loading} className="refresh-button">
        {loading ? 'Refreshing...' : '🔄 Refresh'}
      </button>

      <div className="matches-list">
        {filterMatches().length === 0 ? (
          <div className="no-matches">No matches found</div>
        ) : (
          filterMatches().map(match => {
            const liveData = sofaScoreData[match.id] || {};
            return (
              <div key={match.id} className="match-card">
                <div className="match-header">
                  <span className="tournament">{match.tournament} • {match.category}</span>
                  <span className={`status ${match.isLive ? 'live' : ''}`}>
                    {match.isLive ? '● LIVE' : match.status}
                  </span>
                </div>

                <div className="players">
                  <div className="player-row">
                    <span className={`player ${match.hasBritish ? 'british' : ''}`}>
                      {match.homePlayer}
                    </span>
                    <span className="score">{liveData.homeScore || match.homeScore}</span>
                  </div>
                  <div className="player-row">
                    <span className="player">{match.awayPlayer}</span>
                    <span className="score">{liveData.awayScore || match.awayScore}</span>
                  </div>
                </div>

                {match.isLive && liveData.homePoint && (
                  <div className="live-points">
                    <span className="point">{liveData.homePoint}</span>
                    <span className="divider">-</span>
                    <span className="point">{liveData.awayPoint}</span>
                  </div>
                )}

                <div className="match-meta">
                  <small>Last updated: {new Date(match.lastUpdated * 1000).toLocaleTimeString()}</small>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

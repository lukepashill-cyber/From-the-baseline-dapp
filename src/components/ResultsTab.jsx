import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ResultsTab() {
  const [matches, setMatches] = useState([]);
  const [filter, setFilter] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { load(); const t = setInterval(load, 30000); return () => clearInterval(t); }, []);

  const load = async () => {
    try {
      const r = await axios.get('/api/matches');
      setMatches(r.data);
      setError(null);
    } catch (e) {
      setError('Could not load matches. Try again shortly.');
    } finally { setLoading(false); }
  };

  const shown = matches.filter(m => {
    if (filter === 1) return m.isLive;
    if (filter === 2) return m.category.includes('ATP') || m.category.includes('WTA');
    if (filter === 3) return m.category.includes('ITF') || m.category.includes('Challenger');
    return true;
  });

  return (
    <div className="results-tab">
      <div className="filters">
        {['All','Live','ATP/WTA','Challenger/ITF'].map((l,i)=>(
          <button key={i} className={filter===i?'active':''} onClick={()=>setFilter(i)}>{l}</button>
        ))}
      </div>
      <button onClick={load} disabled={loading} className="refresh-button">{loading?'Refreshing...':'🔄 Refresh'}</button>
      {error && <div className="error-banner">{error}</div>}
      <div className="matches-list">
        {loading ? <div className="no-matches">Loading matches...</div> :
         shown.length === 0 ? <div className="no-matches">No British matches in the last 24 hours.</div> :
         shown.map(m => (
          <div key={m.id} className="match-card">
            <div className="match-header">
              <span className="tournament">{m.tournament} • {m.category}</span>
              <span className={`status ${m.isLive?'live':''}`}>{m.isLive?'● LIVE':m.status}</span>
            </div>
            <div className="players">
              <div className="player-row">
                <span className={`player ${m.hasBritish?'british':''}`}>{m.homePlayer}</span>
                <span className="score">{m.homeScore}</span>
              </div>
              <div className="player-row">
                <span className="player">{m.awayPlayer}</span>
                <span className="score">{m.awayScore}</span>
              </div>
            </div>
            {m.isLive && m.homePoint && (
              <div className="live-points"><span className="point">{m.homePoint}</span><span className="divider">-</span><span className="point">{m.awayPoint}</span></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

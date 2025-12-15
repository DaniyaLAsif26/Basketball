import './ranking-player.css';

export default function PlayerRankings ({players}){

  return (
    <div className="rankings-container">
      {/* Rankings List */}
      <div className="rankings-list">
        {players.map((player) => (
          <div key={player.rank} className="player-card">
            {/* Rank */}
            <div className="rank-badge">
              {player.rank}
            </div>

            {/* Player Image */}
            <img
              src={player.image}
              alt={player.name}
              className="player-image"
            />

            {/* Player Info */}
            <div className="player-info">
              <h3 className="player-name">{player.name}</h3>
              <div className="player-district">{player.district}</div>
            </div>

            {/* Points */}
            <div className="points-badge">
              {player.points.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

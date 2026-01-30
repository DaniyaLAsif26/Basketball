import './all-players.css'

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Search, MapPin } from 'lucide-react';

const BackEndRoute = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function AllPlayers() {

  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState('');
  const [allPlayers, setAllPlayers] = useState([]);
  const [allPlayersLoaded, setAllPlayersLoaded] = useState(false);

  const getAllPlayers = async (searchQuery = '') => {

    try {
      const res = await fetch(`${BackEndRoute}/api/user/all-users?q=${searchQuery}`)

      const dataRes = await res.json()

      if (dataRes.success === false) {
        setAllPlayers([])
        return
      }

      setAllPlayers(dataRes.users)
    }
    catch (err) {
      console.log(err)
      alert(err.message)
      setAllPlayers([])
    }
    finally {
      setAllPlayersLoaded(true)
    }
  }

  useEffect(() => {
    getAllPlayers()
  }, [])

  useEffect(() => {
    const delayBounce = setTimeout(() => {
      getAllPlayers(searchTerm)

      return () => clearInterval(delayBounce)
    }, 400)
  }, [searchTerm])

  const DOB = (date) => {
    if (!date) return;
    const dob = new Date(date)
    const current = new Date()

    const calculateDOB = current.getFullYear() - dob.getFullYear()

    return calculateDOB

  }

  return (
    <div className="users-gallery-container">
      <div className="search-filter-section">
        <div className="search-filter-container">
          <div className="search-filter-flex">
            <div className="search-wrapper">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="players-grid-container">
        {allPlayersLoaded && (
          <div className="players-grid">
            {allPlayers.map((player) => (
              <div key={player.id} className="all-player-card">
                <div className="player-card-header">
                  <div className="player-avatar-container">
                    <div className="player-avatar-wrapper">
                      <div className="player-avatar">
                        <img src={player.profilePicture} alt={player.firstName} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="player-card-content">
                  <h3 className="player-name" onClick={() => navigate(`/players/${player._id}`)}>
                    {player.firstName} &nbsp; {player.lastName}
                  </h3>

                  <div className="player-location">
                    <MapPin className="location-icon" />
                    <span>{player.homeTown || '-'}</span>
                  </div>

                  <div className="player-details">
                    <div className="detail-row">
                      <span className="detail-label">Position</span>
                      <span className="detail-value">{player?.playerPosition || '-'}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Age</span>
                      <span className="detail-value">{DOB(player?.dateOfBirth) || '-'}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Height</span>
                      <span className="detail-value">{player?.height || '-'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {allPlayers.length === 0 && (
          <div className="no-results">
            <div className="no-results-icon-wrapper">
              <Search className="no-results-icon" />
            </div>
            <h3 className="no-results-title">No players found</h3>
          </div>
        )}
      </div>
    </div>
  );
}
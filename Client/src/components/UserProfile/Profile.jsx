import cover from '../../assets/rank-1.avif'

import React, { useState } from 'react';
import { Mail, Phone, Calendar, MapPin, Trophy, Edit, Share2, Ruler, Weight, Maximize2, Target, ChevronRight } from 'lucide-react';
import './profile.css'

export default function PlayerProfile() {
  const [activeTab, setActiveTab] = useState('overview');

  const player = {
    firstName: "Daniyal",
    lastName: "Asif",
    email: "daniyalasif550@gmail.com",
    phone: "7382049545",
    dob: "October 20, 2004",
    avatar: cover,
    cover: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1600&q=80",
    location: "Hyderabad, Telangana",
    height: "5'11\"",
    weight: "75 Kg",
    wingspan: "6'9\"",
    position: "Shooting Guard",
    ranking: 3,
    points: 2847,
    tournaments: 26,
    history: [  
      { year: 2024, list: ["National Championship Finals", "State Cup Elite", "Metro Basketball League"] },
      { year: 2023, list: ["Regional Masters", "Summer Slam Championship", "Winter Warriors Cup", "City Tournament"] },
      { year: 2022, list: ["State Championship", "District Finals", "Spring Basketball Classic"] }
    ]
  };

  return (
    <div className="profile">

      {/* Header */}
      <div className="header">
        <div className="cover">
          <img src={player.cover} alt="Cover" />
          <div className="cover-overlay"></div>
        </div>

        <div className="header-content">
          <div className="header-left">
            <img src={player.avatar} alt={player.firstName} className="avatar" />
            <div className="title">
              <h1>{player.firstName} <span className="accent">{player.lastName}</span></h1>
              <div className="meta">
                <span className="pill">{player.position}</span>
                <span>•</span>
                <MapPin size={16} />
                <span>{player.location}</span>
              </div>
            </div>
          </div>

          <div className="actions">
            <button className="btn-secondary"><Share2 size={18} /> Share</button>
            <button className="btn-primary"><Edit size={18} /> Edit Profile</button>
          </div>
        </div>
      </div>

      {/* Stats Banner */}
      <div className="stats-banner">
        <div className="stat-item">
          <div className="stat-label">Rank</div>
          <div className="stat-value player-rank">#{player.ranking}</div>
        </div>
        <div className="divider"></div>
        <div className="stat-item">
          <div className="stat-label">Points</div>
          <div className="stat-value">{player.points.toLocaleString()}</div>
        </div>
        <div className="divider"></div>
        <div className="stat-item">
          <div className="stat-label">Tournaments</div>
          <div className="stat-value">{player.tournaments}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>OVERVIEW</button>
        <button className={activeTab === 'tournaments' ? 'active' : ''} onClick={() => setActiveTab('tournaments')}>TOURNAMENT HISTORY</button>
      </div>

      {/* Content */}
      <div className="content">
        {activeTab === 'overview' ? (
          <div className="grid">

            {/* Personal Details */}
            <div className="card">
              <h2>Personal Details</h2>
              <div className="details">
                <div className="row"><span>First Name</span><strong>{player.firstName}</strong></div>
                <div className="row"><span>Last Name</span><strong>{player.lastName}</strong></div>
                <div className="row"><span>Email</span><strong className="email">{player.email}</strong></div>
                <div className="row"><span>Phone</span><strong>{player.phone}</strong></div>
                <div className="row"><span>Date of Birth</span><strong>{player.dob}</strong></div>
                <div className="row"><span>Location</span><strong>{player.location}</strong></div>
              </div>
            </div>

            {/* Physical Attributes */}
            <div className="card">
              <h2>Physical Attributes</h2>
              <div className="physical">
                <div className="item">
                  <div className="icon"><Ruler size={24} /></div>
                  <div><span>Height</span><strong>{player.height}</strong></div>
                </div>
                <div className="item">
                  <div className="icon"><Weight size={24} /></div>
                  <div><span>Weight</span><strong>{player.weight}</strong></div>
                </div>
                <div className="item">
                  <div className="icon"><Maximize2 size={24} /></div>
                  <div><span>Wingspan</span><strong>{player.wingspan}</strong></div>
                </div>
                <div className="item">
                  <div className="icon"><Target size={24} /></div>
                  <div><span>Position</span><strong>{player.position}</strong></div>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="timeline">
            <h2>Tournament History</h2>
            {player.history.map((year, i) => (
              <div key={i} className="year-section">
                <div className="year-header">
                  <div className="circle"></div>
                  <h3>{year.year}</h3>
                  <span className="count">{year.list.length} Tournaments</span>
                </div>
                <div className="tournaments">
                  {year.list.map((t, j) => (
                    <div key={j} className="tournament">
                      <Trophy size={20} />
                      <span>{t}</span>
                      <ChevronRight size={18} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
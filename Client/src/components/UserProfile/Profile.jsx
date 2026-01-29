import { useLogin } from '../../context/LoginContext.jsx'
import { MdVerified } from "react-icons/md";
import { GoUnverified } from "react-icons/go";

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Mail, Phone, Calendar, MapPin, Trophy, Edit, Share2, Ruler, Weight, Maximize2, Target, ChevronDown, ChevronUp } from 'lucide-react';
import './profile.css'

export default function PlayerProfile({ UserData }) {

  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('overview');
  const [openDrop, setOpenDrop] = useState(null);

  const toggleDrop = (index) => {
    setOpenDrop(prev => prev === index ? null : index);
  };

  const { userData, logOutUser } = useLogin()

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`;
  };

  const DOB = (date) => {
  if(!date) return ;
  
    const dob = new Date(date)
    const current = new Date()

    const calculateDOB = current.getFullYear() - dob.getFullYear()

    return calculateDOB

  }

  return (
    <div className="profile">

      {/* Header */}
      <div className="header">
        <div className="cover">
          <img src="https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1600&q=80" alt="Cover" />
          <div className="cover-overlay"></div>
        </div>

        <div className="header-content">
          <div className="header-left">
            <img src={UserData.profilePicture} alt={UserData.firstName} className="avatar" />
            <div className="title">
              <h1>{UserData.firstName} <span className="accent">{UserData.lastName || '-'}</span>
                {UserData.verified ?

                  <span className='verified-icon' >
                    <MdVerified />
                    <span>Verified</span>
                  </span>

                  : <span className='verified-icon' >
                    <GoUnverified />
                    <span>Not Verified</span>
                  </span>
                }
              </h1>
              <div className="meta">
                <span className="pill">{UserData.playerPosition || '-'}</span>
                <span className='dot'>•</span>
                
                <span><MapPin size={16} /> &nbsp;{UserData.homeTown || '-'}</span>
              </div>
            </div>
          </div>

          <div className="actions">
            <button className="user-button btn-secondary"><Share2 size={18} /> Share</button>
            {userData._id === UserData._id &&
              <>
                <button className="user-button btn-primary" onClick={() => navigate('/my-account/edit')}><Edit size={18} /> Edit</button>
                <button className='user-logout-btn user-button btn-primary' onClick={logOutUser}>Logout  <LogOut size={18} /></button>
              </>
            }
          </div>
        </div>
      </div>

      {/* Stats Banner */}
      <div className="stats-banner">
        <div className="stat-item">
          <div className="profile-stat-label">Rank</div>
          <div className="stat-value player-rank">#{UserData.ranking?.currentRanking || '-'}</div>
        </div>
        <div className="divider"></div>
        <div className="stat-item">
          <div className="profile-stat-label">Points</div>
          <div className="stat-value">{UserData.ranking.rankingPoints?.toLocaleString() || '-'}</div>
        </div>
        <div className="divider"></div>
        <div className="stat-item">
          <div className="profile-stat-label">Tournaments</div>
          <div className="stat-value">{Object.values(UserData.tournamentsParticipated).reduce((total, tournaments) =>
            total + tournaments.length, 0
          )}</div>
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
                <div className="row"><span>First Name</span><strong>{UserData.firstName}</strong></div>
                <div className="row"><span>Last Name</span><strong>{UserData.lastName || '-'}</strong></div>
                <div className="row"><span>Age</span><strong>{DOB(UserData?.dateOfBirth) || '-'}</strong></div>
                <div className="row"><span>Gender</span><strong>{UserData.gender || '-'}</strong></div>
                <div className="row"><span>Email</span><strong className="email">{UserData.email}</strong></div>
                {userData._id === UserData._id &&
                  <div className="row"><span>Phone</span><strong>{UserData.phoneNumber || '-'}</strong></div>
                }
                <div className="row"><span>Date of Birth</span><strong>{formatDate(UserData?.dateOfBirth) || '-'}</strong></div>
                <div className="row"><span>Location</span><strong>{UserData.homeTown || '-'}</strong></div>
              </div>
            </div>

            {/* Physical Attributes */}
            <div className="card">
              <h2>Physical Attributes</h2>
              <div className="physical">
                <div className="item">
                  <div className="user-card-icon"><Ruler size={24} /></div>
                  <div><span>Height (Feet)</span><strong>{UserData.height || '-'}</strong></div>
                </div>
                <div className="item">
                  <div className="user-card-icon"><Weight size={24} /></div>
                  <div><span>Weight (Kg)</span><strong>{UserData.weight || '-'}</strong></div>
                </div>
                <div className="item">
                  <div className="user-card-icon"><Maximize2 size={24} /></div>
                  <div><span>Wingspan (Feet)</span><strong>{UserData.wingspan || '-'}</strong></div>
                </div>
                <div className="item">
                  <div className="user-card-icon"><Target size={24} /></div>
                  <div><span>Position</span><strong>{UserData.playerPosition || '-'}</strong></div>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="timeline">
            <h2>Tournament History</h2>

            {Object.entries(UserData.tournamentsParticipated)
              .sort(([yearA], [yearB]) => yearB - yearA)
              .map(([year, tournament]) => (
                <div key={year} className="year-section">
                  <div className="year-header">
                    <div className="circle"></div>
                    <h3>{year}</h3>
                    <span className="count">{tournament.length} Tournaments</span>
                  </div>
                  <div className="tournaments">
                    {tournament.map((item, index) => {
                      const uniqueKey = `${year}-${index}`;
                      return (
                        <div key={uniqueKey} className="tournament-wrapper">
                          <div
                            className="tournament"
                            onClick={() => toggleDrop(uniqueKey)}
                          >
                            <Trophy size={20} />
                            <span>{item.name}</span>
                            {openDrop === uniqueKey ? (
                              <ChevronUp size={18} />
                            ) : (
                              <ChevronDown size={18} />
                            )}
                          </div>

                          <div className={`tournament-stats-cont ${openDrop === uniqueKey ? 'open' : ''}`}>
                            <div className="tournament-stats tournament">
                              <div className="team-stats">
                                <div >
                                  Team Position :
                                </div>
                                <div className="">
                                  {item.stats.teamPosition || <span>N/A</span>}
                                </div>
                              </div>

                              <div className="team-stats">
                                <div >
                                  Points :
                                </div>
                                <div className="">
                                  {item.stats.points || <span>N / A</span>}
                                </div>
                              </div>

                              <div className="team-stats">
                                <div >
                                  Assists :
                                </div>
                                <div className="">
                                  {item.stats.assists || <span>N / A</span>}
                                </div>
                              </div>

                              <div className="team-stats">
                                <div >
                                  Rebounds :
                                </div>
                                <div className="">
                                  {item.stats.rebounds || <span>N / A</span>}
                                </div>
                              </div>

                              <div className="team-stats">
                                <div >
                                  Matches Played :
                                </div>
                                <div className="">
                                  {item.stats.matchesPlayed || <span>N / A</span>}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            }
          </div>
        )}
      </div>

    </div >
  );
}
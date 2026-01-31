import './sidebar.css'
import { useState, useEffect } from 'react';
import { useLogin } from '../../context/LoginContext'
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ isOpen, isClose }) {

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('sidebar-open');
        } else {
            document.body.classList.remove('sidebar-open');
        }

        // Cleanup on unmount
        return () => {
            document.body.classList.remove('sidebar-open');
        };
    }, [isOpen]);

    const { isUseLoading, userData, isUserLoggedIn } = useLogin()
    const navigate = useNavigate()

    const navItems = [
        {
            id: 'events',
            label: 'Events',
            route: '/events',
            icon: (
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
            )
        },
        {
            id: 'news',
            label: 'News',
            route: '/news',
            icon: (
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                </svg>
            )
        },
        {
            id: 'rankings',
            label: 'Rankings',
            route: '/rankings',
            icon: (
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 18v-6M12 18V6M8 18v-4"></path>
                    <path d="M3 18h18"></path>
                </svg>
            )
        },
        {
            id: 'districts',
            label: 'Districts',
            route: '/districts',
            icon: (
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>
            )
        },
        {
            id: 'players',
            label: 'Players',
            route: '/players',
            icon: (
                <svg
                    className="nav-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
            )
        },
        {
            id: 'about',
            label: 'About',
            route: '/about',
            icon: (
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
            )
        },
        {
            id: 'gallery',
            label: 'Gallery',
            route: '/gallery',
            icon: (
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
            )
        }
    ];

    const logInRedirect = (e) => {
        e.preventDefault()
        navigate('/login')
    }

      const redirectUserProfile = (e) => {
    e.preventDefault()
    navigate('/my-account')
    isClose(false)
    return
  }

    return (
        <div className={`sidebar-cont ${isOpen ? 'side' : ''}`}>

            <div className={`tba-sidebar ${isOpen ? 'side' : ''}`}>
                {/* User Profile Section */}
                {isUseLoading || isUserLoggedIn ?
                    <div className="user-section">
                        <div className="user-photo-container">
                            <div className="photo-ring"></div>
                            <div className="user-photo" onClick={redirectUserProfile}>
                                <img src={userData.profilePicture} alt="" />
                            </div>
                        </div>
                        <div className="user-info">
                            <div className="username" onClick={redirectUserProfile}>{userData.firstName}&nbsp; {userData.lastName}</div>
                            <div className="user-email" onClick={redirectUserProfile}>{userData.email}</div>
                        </div>
                    </div>

                    :
                    <div className="user-section">
                        <div className="user-photo-container">
                            <div className="photo-ring"></div>
                            <div className="user-photo">
                                <img src='https://cdn-icons-png.flaticon.com/512/2348/2348811.png' alt="" />
                            </div>
                        </div>
                        <button className='side-login-btn login-btn' onClick={logInRedirect}>
                            <div><span>Log in</span></div>
                        </button>
                    </div>
                }

                <div className="quick-links">
                    <ul className="nav-links">
                        {navItems.map((item, index) => (
                            <>
                                <li
                                    key={item.id}
                                    className="nav-item"
                                    style={{ animationDelay: `${0.2 + index * 0.05}s` }}
                                >
                                    {console.log(item.route, location.pathname)}
                                    <a
                                        href={`#${item.id}`}
                                        className={`nav-link ${item.route === location.pathname ? 'active' : ''}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate(item.route)
                                            isClose(false)
                                        }}
                                    >
                                        {item.icon}
                                        {item.label}
                                    </a>
                                </li>
                            </>
                        ))}
                    </ul>
                </div>

                {/* Footer Badge */}
                <div className="sidebar-footer">
                    <div className="tba-badge">
                        Telangana Basketball
                    </div>
                </div>
            </div>
        </div>

    );
};
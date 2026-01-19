import './navbar.css';
import logo from '../../assets/red.png';
import { useNavigate } from 'react-router-dom'
import { NavLink  } from 'react-router-dom';
import { useState } from 'react';
import { useLogin } from '../../context/LoginContext.jsx'

import { FaPlus } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {

  const navigate = useNavigate()

  const { isUserLoggedIn , userData } = useLogin()

  const navLinks = [
    {link : "EVENTS", href : "/events"},
    {link : "NEWS", href : "/news"},
    {link : "RANKING", href : "/rankings"},
    {link : "DISTRICTS", href : "/districts"},
    {link : "ABOUT US", href : "/about"},
    {link : "GALLERY", href : "/gallery"},
  ]

  const logInRedirect = (e) => {
    e.preventDefault()
    navigate('/login')
  }

  const eventRedirect = (e) => {
    e.preventDefault()
    navigate('/add-event')
  }

  const user = {
    name: "Daniyal",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80"
  };

  return (
    <nav className='navbar'>

      <div className="logo">
        <NavLink to='/'> <img src={logo} alt="" /></NavLink>
      </div>
      <div className="nav-right">
        <div className="options">
          <ul>
            {navLinks.map((item , index)=>(
              <li key={index}><NavLink to={item.href}> {item.link} </NavLink></li>
            ))}
          </ul>
        </div>
        <div className="nav-btns">
          <div className="add-event">
            <button className="add-event-btn" onClick={eventRedirect}>
              <span class="shadow"></span>
              <span class="edge"></span>
              <span class="front text">
                Host <FaPlus />
              </span>
            </button>
          </div>
          {isUserLoggedIn ?

            <div className="user-account" onClick={() => navigate('/my-account')}>
              <FaUserCircle />
              <span className="user-name">{userData.name}</span>
            </div>
            :
            <div className="login">
              <button className='login-btn' onClick={logInRedirect}>
                <div><span>Log in</span></div>
              </button>
            </div>
          }
        </div>
      </div>
    </nav>
  );
}
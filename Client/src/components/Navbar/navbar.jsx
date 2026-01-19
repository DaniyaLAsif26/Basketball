import './navbar.css';
import logo from '../../assets/red.png';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useLogin } from '../../context/LoginContext.jsx'

import { FaPlus } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {

  const navigate = useNavigate()

  const { isUserLoggedIn } = useLogin()

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
        <a href="/"> <img src={logo} alt="" /></a>
      </div>
      <div className="nav-right">
        <div className="options">
          <ul>
            <li><a href="/events">EVENTS</a></li>
            <li><a href="/news">NEWS</a></li>
            <li><a href="/rankings">RANKING</a></li>
            <li><a href="/districts">DISTRICTS</a></li>
            <li><a href="/about">ABOUT US</a></li>
            <li><a href="/gallery">GALLERY</a></li>
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
              <span className="user-name">{user.name}</span>
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
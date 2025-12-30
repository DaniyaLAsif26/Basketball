import './navbar.css';
import logo from '../../assets/red.png';
import { useNavigate } from 'react-router-dom'

import { FaPlus } from "react-icons/fa6";

export default function Navbar() {

  const navigate = useNavigate()

  const logInRedirect = (e) => {
    e.preventDefault()
    navigate('/login')
  }

  const eventRedirect = (e) => {
    e.preventDefault()
    navigate('/add-event')
  }

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
          <div className="login">
            <button className='login-btn' onClick={logInRedirect}>
              <div><span>Log in</span></div>
            </button>
          </div>
        </div>
      </div>

    </nav>
  );
}
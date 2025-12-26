import './navbar.css';
import logo from '../../assets/red.png';
import { useNavigate } from 'react-router-dom'

export default function Navbar() {

  const navigate = useNavigate()

  const logInRedirect = (e) => {
    e.preventDefault()
    navigate('/login')
  }

  return (
    <nav>
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
        <div className="login">
          <button className='login-btn' >Log in</button>
        </div>
      </div>
    </nav>
  );
}
import './navbar.css';
import logo from '../../assets/red.png';

export default function Navbar() {
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
          <button className='login-btn'>Log In</button>
        </div>
      </div>
    </nav>
  );
}
import './navbar.css';
import logo from '../../assets/red.png';

export default function Navbar() {
  return (
    <nav>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="nav-right">
        <div className="options">
          <ul>
            <li><a href="">EVENTS</a></li>
            <li><a href="">NEWS</a></li>
            <li><a href="">RANKING</a></li>
            <li><a href="">PLAYERS</a></li>
            <li><a href="">DISTRICTS</a></li>
            <li><a href="">ABOUT US</a></li>
            <li><a href="">GALLERY</a></li>
          </ul>
        </div>
        <div className="login">
          <button className='login-btn'>Log In</button>
        </div>
      </div>
    </nav>
  );
}
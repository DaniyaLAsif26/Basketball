import './navbar.css';
import logo from '../../assets/red.png';
import { useNavigate, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useLogin } from '../../context/LoginContext.jsx'

import { FaPlus } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";

import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

import Sidebar from '../Sidebar/SideBar.jsx';

export default function Navbar() {

  const navigate = useNavigate()

  const { isUserLoggedIn, userData, checkCompleteUserProfile } = useLogin()

  const [sidebar, setSidebar] = useState(false)
  const [navbarWidth, setNavbarWidth] = useState(window.innerWidth < 999)

  useEffect(() => {
    const handleResize = () => {
      setNavbarWidth(window.innerWidth < 999)
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [])

  const navLinks = [
    { link: "EVENTS", href: "/events" },
    { link: "NEWS", href: "/news" },
    { link: "RANKING", href: "/rankings" },
    { link: "DISTRICTS", href: "/districts" },
    { link: "ABOUT US", href: "/about" },
    { link: "GALLERY", href: "/gallery" },
  ]

  const logInRedirect = (e) => {
    e.preventDefault()
    navigate('/login')
  }

  const eventRedirect = (e) => {
    e.preventDefault()
    navigate('/add-event')
  }

  const redirectUserProfile = (e) => {
    e.preventDefault()
    navigate('/my-account')
    return
  }


  return (
    <nav className='navbar'>
      {!navbarWidth ?
        <>
          <div className="logo">
            <NavLink to='/'> <img src={logo} alt="" /></NavLink>
          </div>
          <div className="nav-right">
            <div className="options">
              <ul>
                {navLinks.map((item, index) => (
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

                <div className="user-account" onClick={redirectUserProfile}>
                  <FaUserCircle />
                  <span className="user-name">{userData?.firstName}</span>
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
        </>
        :
        <>
          <div className="logo">
            <NavLink to='/'> <img src={logo} alt="" /></NavLink>
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
            {sidebar ?
              <IoClose className="menu-btn" onClick={() => setSidebar(prev => !prev)} />
              :
              <GiHamburgerMenu className="menu-btn" onClick={() => setSidebar(prev => !prev)} />
            }
          </div>
          {sidebar &&
            <Sidebar isOpen={sidebar} isClose={setSidebar} />
          }
        </>
      }
    </nav>
  );
}
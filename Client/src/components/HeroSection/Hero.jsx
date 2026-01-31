import into_bg from '../../assets/intro-bg.jpg'
import { useNavigate } from 'react-router-dom'

import './hero.css'

export default function HeroSection() {
    const navigate = useNavigate();

    return (
        <div className="hero-cont">
            <div className="hero-bg-img">
                <img src={into_bg} alt="" />
            </div>
            <div className="hero-bg-color"></div>
            <div className="hero-head">
                <h1>
                    TELANGANA&nbsp; BASKETBALL&nbsp; ASSOCIATION
                </h1>
                <p>"Governing & Growing Basketball Across Telangana"</p>
                <div className="hero-btns">
                    <button className="comic-button" onClick={() => navigate('/events')}>Events</button>
                    <button className="comic-button comic-button-2" onClick={() => navigate('/about')}>About Us</button>
                </div>
            </div>
        </div>
    )
}
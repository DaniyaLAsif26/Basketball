import './intro.css'
import into_bg from '../../assets/intro-bg.jpg'
import {useNavigate} from 'react-router-dom'

export default function Intro() {
    const navigate = useNavigate();

    return (
        <div className="intro-cont">
            <div className="intro-bg-img">
                <img src={into_bg} alt="" />
            </div>
            <div className="intro-bg-color"></div>
            <div className="intro-head">
                <h1>
                    TELANGANA&nbsp; BASKETBALL&nbsp; ASSOCIATION
                </h1>
                <p>"Governing & Growing Basketball Across Telangana"</p>
                <div className="intro-btns">
                    <button className="comic-button" onClick={() => navigate('/events')}>Events</button>
                    <button className="comic-button comic-button-2" onClick={() => navigate('/about')}>About Us</button>
                </div>
            </div>
        </div>
    )
}
import './intro.css'
import into_bg from '../../assets/intro-bg.jpg'

export default function Intro() {
    return (
        <div className="intro-cont">
            <div className="intro-head">
                <h1>
                    TELANGANA&nbsp; BASKETBALL&nbsp; ASSOCIATION
                </h1>
                <p>"Governing & Growing Basketball Across Telangana"</p>
                <div className="intro-btns">
                    <button class="comic-button">Events</button>
                    <button class=" comic-button comic-button-2">About Us</button>
                </div>
            </div>
            <div className="intro-bg-img">
                <img src={into_bg} alt="" />
            </div>
            <div className="intro-bg-color"></div>
        </div>
    )
}
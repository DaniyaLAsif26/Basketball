import { useNavigate } from 'react-router-dom'
import into_bg from '../../assets/intro-bg.jpg'

export default function Intro() {
    const navigate = useNavigate();

    return (
        <>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=BBH+Bartle&family=Sekuya&display=swap');
                    
                    .intro-section-wrapper {
                        height: calc(100vh - 5rem);
                        background-color: rgb(41, 41, 41);
                        position: relative;
                        overflow: hidden;
                        width: 100%;
                    }

                    .intro-section-wrapper .intro-background-image {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        top: 0;
                        left: 0;
                        opacity: 0.95;
                        z-index: 0;
                    }

                    .intro-section-wrapper .intro-background-image img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        opacity: 0.45;
                        animation: introZoomInOut 7s ease-in-out infinite;
                    }

                    @keyframes introZoomInOut {
                        0% {
                            transform: scale(1);
                        }
                        50% {
                            transform: scale(1.07);
                        }
                        100% {
                            transform: scale(1);
                        }
                    }

                    .intro-section-wrapper .intro-overlay {
                        position: absolute;
                        background-color: rgba(0, 0, 0, 0.485);
                        height: 100%;
                        width: 100%;
                        top: 0;
                        left: 0;
                        z-index: 1;
                    }

                    .intro-section-wrapper .intro-heading {
                        color: red;
                        position: absolute;
                        z-index: 2;
                        bottom: 11rem;
                        left: 2.5rem;
                        display: flex;
                        flex-direction: column;
                        text-shadow: 2.5px 2px 2.5px #000000, 5px 4px 5px #000000, 7.5px 6px 7.5px #000000, 10px 8px 10px #000000, 12.5px 10px 12.5px #000000;
                    }

                    .intro-section-wrapper .intro-heading h1 {
                        font-size: 3.26rem;
                        margin: 0;
                        background: transparent;
                        font-family: "BBH Bartle", sans-serif;
                    }

                    .intro-section-wrapper .intro-heading p {
                        font-size: 1.2rem;
                        font-weight: bold;
                        padding: 2.26rem 1.5rem 1rem;
                        text-shadow: 1px 1px 2px #000000, 2px 2px 4px #000000, 3px 3px 6px #000000, 4px 4px 8px #000000;
                    }

                    .intro-section-wrapper .intro-button-group {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        gap: 2rem;
                        margin: 3.5rem 1rem 1.5rem;
                    }

                    .intro-comic-btn {
                        display: inline-block;
                        padding: 10px 20px;
                        font-size: 1.15rem;
                        font-weight: bold;
                        text-align: center;
                        text-decoration: none;
                        color: #fff;
                        background-color: #ff5252;
                        border: 2px solid black;
                        border-radius: 10px;
                        box-shadow: 4px 4px 0px white;
                        transition: all 0.3s ease;
                        cursor: pointer;
                    }

                    .intro-comic-btn-secondary {
                        box-shadow: -4px 4px 0px white;
                    }

                    .intro-comic-btn:hover {
                        background-color: #fff;
                        color: #ff5252;
                        border: 2px solid #ff5252;
                        box-shadow: 5px 5px 0px #ff5252;
                    }

                    .intro-comic-btn-secondary:hover {
                        box-shadow: -5px 5px 0px #ff5252;
                    }

                    .intro-comic-btn:active {
                        background-color: #fcf414;
                        box-shadow: none;
                        transform: translateY(4px);
                    }
                `}
            </style>

            <div className="intro-section-wrapper">
                <div className="intro-background-image">
                    <img src={into_bg} alt="Basketball background" />
                </div>
                <div className="intro-overlay"></div>
                <div className="intro-heading">
                    <h1>
                        TELANGANA&nbsp; BASKETBALL&nbsp; ASSOCIATION
                    </h1>
                    <p>"Governing & Growing Basketball Across Telangana"</p>
                    <div className="intro-button-group">
                        <button 
                            className="intro-comic-btn" 
                            onClick={() => navigate('/events')}
                        >
                            Events
                        </button>
                        <button 
                            className="intro-comic-btn intro-comic-btn-secondary" 
                            onClick={() => navigate('/about')}
                        >
                            About Us
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
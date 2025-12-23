import './tournament.css';
import { useNavigate } from 'react-router-dom'

export default function Tournament() {

    const navigate = useNavigate()

    return (
        <div className="tournament-home">
            <div className="tournament-cont">
                <div className="tournament-info">
                    <h2>PARTICIPATE & HOST TOURNAMENTS</h2>
                    <p>Players across Telangana can register on our website and stay updated about upcoming state-level tournaments and leagues. </p>
                    <p>Organizers can also host their own basketball tournaments with ease on the platform.</p>
                    <button className='tournament-btn' onClick={()=> navigate('/events')}>Lets's Go</button>
                </div>
            </div>
        </div>
    )
}
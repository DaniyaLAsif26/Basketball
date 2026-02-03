import player1 from '../../assets/rank-1.avif'
import './rankings.css'
import PlayerRankings from './Ranking-player.jsx'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

export default function Rankings() {

    const navigate = useNavigate()

    const players = [
        { rank: 1, name: "Daniyal Asif Ahmed", points: 2847, district: "Hyderabad", image: player1 },
        { rank: 2, name: "Bilal Hyder", points: 2756, district: "Hyderabad", image: player1 },
        { rank: 3, name: " Vineet Sharma", points: 2698, district: "Ranga Reddy", image: player1 },
        { rank: 4, name: "Lingala Chandra Aditya", points: 2634, district: "Medchal-Malkajgiri", image: player1 },
        { rank: 5, name: "Sai Srinivas", points: 2589, district: "Kumuram Bheem Asifabad", image: player1 },
        { rank: 6, name: "Prithvi Sagar", points: 2512, district: "Kumuram Bheem Asifabad", image: player1 },
        { rank: 7, name: "Mandadi Manideep Yadav", points: 2467, district: "Kamareddy", image: player1 },
    ];

    const category = ["MEN", "WOMEN", "YOUTH MEN", "YOUTH WOMEN"]

    const [selected, setSelected] = useState(() => {
        return sessionStorage.getItem('search') || "MEN"
    })

    useEffect(() => {
        sessionStorage.setItem('search', selected)
    }, [selected])

    return (
        <div className="rankings-cont">
            <div className="rankings-head">
                <div className="ranking-heading">PLAYER RANKING'S</div>
            </div>
            <div className="rankings">
                <div className="rankings-res-head">
                    <div className="rankings-update">
                        Updated on 20/10/2025
                    </div>
                    <div className="rankings-how">
                        <button className='tournament-btn'>How it works</button>
                    </div>
                </div>
                <div className="ranking-options">
                    <ul>
                        {category.map((cat, index) => (
                            <li 
                            key={index}
                            className={`${selected === cat ? 'selected-cat' : ''}`} onClick={() => setSelected(cat)}>{cat}</li>
                        ))}
                    </ul>
                    <button className="all-players-btn" onClick={() => navigate('/players')}>All Players</button>
                </div>
                <PlayerRankings players={players} />
            </div>
        </div>
    )
}
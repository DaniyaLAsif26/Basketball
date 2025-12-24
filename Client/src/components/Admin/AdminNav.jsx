import './admin-nav.css'
import { useNavigate } from 'react-router-dom';

import { IoMdHome } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";

export default function AdminNav() {

    const navigate = useNavigate()

    return (
        <div className="admin-nav">
            <div className="admin-nav-head">
                <h2>ADMIN PANEL</h2>
            </div>
            <div className="admin-nav-btn">
                <button onClick={() => navigate('/')}><IoMdHome /> Home</button>
                <button className='admin-logout-btn'><IoLogOutOutline /> Logout</button>
            </div>
        </div>
    )
}
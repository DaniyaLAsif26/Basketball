import './admin.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import AdminOption from './Admin-options';
import AllUsers from './AllUsers';

import { IoMdHome } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";

import { FaUser } from "react-icons/fa";
import { MdEmojiEvents } from "react-icons/md";
import { GiNewspaper } from "react-icons/gi";
import { MdHistory } from "react-icons/md";

const AdminOptions = [
    { img: <FaUser />, option: 'PLAYERS' },
    { img: <MdEmojiEvents />, option: 'EVENTS' },
    { img: <GiNewspaper />, option: 'NEWS' },
    { img: <MdHistory />, option: 'LOGS' },
]

export default function Admin() {

    const navigate = useNavigate()

    const [option, setOption] = useState(() => {
        return sessionStorage.getItem('adminOption') || 'PLAYERS'
    })

    useEffect(() => {
        sessionStorage.setItem('adminOption', option)
    }, [option])

    const userTable = ["No", "Name", "Ranking", "Points"]

    return (
        <div className="admin-cont">
            <div className="admin-nav">
                <div className="admin-nav-head">
                    <h2>ADMIN PANEL</h2>
                </div>
                <div className="admin-nav-btn">
                    <button onClick={() => navigate('/')}><IoMdHome /> Home</button>
                    <button className='admin-logout-btn'><IoLogOutOutline /> Logout</button>
                </div>
            </div>
            <div className="admin-body">
                <AdminOption options={AdminOptions} selectedOption={option} setOption={setOption} />
                <div className="admin-opt-results">
                    {option === 'PLAYERS' && <AllUsers table={userTable} />}

                </div>
            </div>
        </div>
    )
}
import './admin.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import AdminOption from './Admin-options';
import AllUsers from './AllUsers';
import AllEvents from './AllEvents';
import AdminNews from './AdminNews';

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
    const [option, setOption] = useState(() => {
        return sessionStorage.getItem('adminOption') || 'PLAYERS'
    })

    useEffect(() => {
        sessionStorage.setItem('adminOption', option)
    }, [option])

    const userTable = ["No", "Name", 'Email', "Ranking"]
    const eventTable = ["Headline", "Date"]
    const newsTable = ["Title", "date"]

    return (
        <div className="admin-cont">
            <div className="admin-body">
                <AdminOption options={AdminOptions} selectedOption={option} setOption={setOption} />
                <div className="admin-opt-results">

                    {option === 'PLAYERS' && <AllUsers table={userTable} />}
                    {option === 'EVENTS' && <AllEvents table={eventTable} />}
                    {option === 'NEWS' && <AdminNews table={newsTable} />}

                </div>
            </div>
        </div>
    )
}
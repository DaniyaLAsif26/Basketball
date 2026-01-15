import { useNavigate } from 'react-router-dom'
import './all-events.css'
import './all-users.css'
import OptionsHead from './OptionHead'
import { useState, useEffect } from 'react'

const BackEndRoute = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function AllEvents({ table }) {

    const navigate = useNavigate()

    const [search, setSearch] = useState('')
    const [events, setEvents] = useState([])

    const OptHead = {
        heading: "All Events",
        placeholder: "Search Events",
        search: setSearch,
        btn: "Add Event",
        url: '/admin/add-event',
    }


    useEffect(() => {
        const adminAllEvents = async () => {
            try {
                const res = await fetch(`${BackEndRoute}/api/event/all-events`)

                const dataRes = await res.json()

                if (dataRes.success === true) {
                    return setEvents(dataRes.data)
                }

                alert(`Error: ${dataRes.message}`)
            }
            catch (err) {
                console.log(err)
                alert(`Something went wrong while fetching news`)
            }
        }
        adminAllEvents()
    }, [])

    return (
        <div className="all-events cont">
            <OptionsHead head={OptHead} />
            <div className="all-users">
                <div className="all-users-table-cont">
                    <table className='all-users-table'>
                        <thead>
                            <tr>
                                {table.map((item, index) => (
                                    <th key={index}>{item}</th>
                                ))}
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event, index) => (
                                <tr key={event._id}>
                                    <td>{event.tournamentName}</td>
                                    <td>{new Date(event.startDate).toLocaleString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}</td>
                                    <td>
                                        <button className='edit-news-btn' onClick={() => navigate(`/event/edit/${event._id}`, {
                                            state: {
                                                from: 'admin'
                                            }
                                        })}>Edit</button>
                                    </td>
                                    <td>
                                        {/* <button className='delete-news-btn' onClick={() => deleteNews(item._id)}>Delete</button> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
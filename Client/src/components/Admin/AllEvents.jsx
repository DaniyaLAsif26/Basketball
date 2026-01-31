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

    const adminAllEvents = async (searchQuery = '') => {
        try {
            const res = await fetch(`${BackEndRoute}/api/event/all-events?q=${searchQuery}`, {
                credentials: 'include',
            })

            const dataRes = await res.json()

            if (dataRes.success === true) {
                return setEvents(dataRes.data)
            } else {
                setEvents([])
            }
        }
        catch (err) {
            console.log(err)
            alert(`Something went wrong while fetching news`)
        }
    }

    useEffect(() => {
        adminAllEvents()
    }, [])

    useEffect(() => {
        const delayBounce = setTimeout(() => {
            adminAllEvents(search)

            return () => clearInterval(delayBounce)
        }, 400)

    }, [search])

    const deleteEvent = async (id) => {
        try {
            const res = await fetch(`${BackEndRoute}/api/event/delete/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            })

            const dataRes = await res.json()

            if (dataRes.success === false) {
                alert(`Error deleting event: ${dataRes.message}`)
                return
            }
            alert('Event deleted successfully')
            setEvents(events => events.filter(event => event._id !== id))
        }
        catch (err) {
            console.log(err)
            alert(`Error deleting event: ${err.message}`)
        }
    }

    return (
        <div className="all-events cont">
            <OptionsHead head={OptHead} />
            <div className="all-users">
                <div className="all-users-table-cont">
                    {events.length !== 0 ? (
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
                                            <button className='delete-news-btn' onClick={() => deleteEvent(event._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) :
                        (
                            <div className="error-msg-admin">
                                No Events Found
                            </div>

                        )}
                </div>
            </div>
        </div>
    )
}
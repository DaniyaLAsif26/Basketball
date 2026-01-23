import './view-event.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useLogin } from '../../context/LoginContext.jsx'
import { MdDelete } from "react-icons/md";

import {
    Calendar,
    Users,
    Trophy,
    IndianRupee,
    Layers,
    Phone,
    Mail,
    MapPin,
    Instagram,
    ArrowLeft,
    Award
} from 'lucide-react';

export default function ViewEvent() {

    const BackEndRoute = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

    const navigate = useNavigate()

    const { userData, isUserLoggedIn } = useLogin()

    const { id } = useParams()
    const [event, setEvent] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await fetch(`${BackEndRoute}/api/event/${id}`)

                const data = await res.json()

                if (data.success === true) {
                    setEvent(data.data)
                }
            }
            catch (err) {
                console.log(err)
            }
            finally {
                setLoading(false)
            }
        }

        fetchEvent()
    }, [id])

    const deleteEvent = async (id) => {
        console.log(id)
        const res = await fetch(`${BackEndRoute}/api/event/delete/${id}`, {
            method: 'DELETE',
            Credential: 'include'
        })

        const data = await res.json()

        if (data.success === false) {
            return alert(`${data.message}`)
        }

        alert(`${data.message}`)
        navigate('/events')
    }

    const formatedDate = (start, end) => {
        const s = new Date(start)
        const e = new Date(end)

        const sameMonth = s.getMonth() === e.getMonth()
        const sameYear = s.getFullYear() === e.getFullYear()

        if (sameMonth && sameYear) {
            return `${s.toLocaleString('en-US', { month: 'long' })} ${s.getDate()} - ${e.getDate()}, ${s.getFullYear()}`
        }

        if (sameYear) {
            return `${s.toLocaleString('en-US', { month: 'long' })} ${s.getDate()} - ${e.toLocaleString('en-US', { month: "long" })} ${e.getDate()}, ${e.getFullYear()}}`
        }

        return `${s.toLocaleString('en-US', { month: 'long' })} ${s.getDate()},${s.getFullYear()} - ${e.toLocaleString('en-US', { month: 'long' })} ${e.getDate()},${e.getFullYear()}`
    }

    if (loading) return <p>Loading...</p>
    if (!event) return <p>Event not found</p>

    return (
        <div className="page-wrapper">

            {/* Header Section */}
            <div className="page-header">
                <div className="event-page-back">
                    <button className="back-btn" onClick={() => navigate('/events')}>
                        <ArrowLeft className="icon-sm" />
                        Back to Events
                    </button>
                </div>
            </div>

            <div className="page-container">

                {/* Hero Image Section */}
                <div className="hero-section">
                    <img
                        src={event.tournamentImage}
                        alt="Basketball Tournament"
                        className="hero-img"
                    />
                    <div className="hero-overlay"></div>

                    <div className="hero-content">
                        <div className="hero-badges">
                            <span className="hero-badge type">{event.level}</span>
                            <span className="hero-badge level">{event.type}</span>
                        </div>
                        <h1 className="hero-title">{event.tournamentName}</h1>
                        <div className="hero-meta">
                            <div className="meta-item">
                                <Calendar className="icon-sm" />
                                <span>{formatedDate(event.startDate, event.endDate)}</span>
                            </div>
                            <div className="meta-item">
                                <MapPin className="icon-sm" />
                                <span>{event.venueName}, {event.city}</span>
                            </div>
                        </div>
                        <div className="event-deadline">
                            <span>Deadline : {new Date(event.registrationDeadline).toLocaleString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="content-grid">

                    {/* Left Column - Main Info */}
                    <div className="main-column">

                        {/* Quick Info Cards */}
                        <div className="info-grid">

                            <div className="info-card">
                                <div className="info-icon">

                                    <Layers className="icon-md" />
                                </div>
                                <div className="info-text">
                                    <span className="info-label">Category</span>
                                    <span className="info-value">{event.category}</span>
                                </div>
                            </div>

                            <div className="info-card">
                                <div className="info-icon">
                                    <Users className="icon-md" />
                                </div>
                                <div className="info-text">
                                    <span className="info-label">Age Category</span>
                                    <span className="info-value">{event.ageCategory}</span>
                                </div>
                            </div>

                            <div className="info-card">
                                <div className="info-icon">
                                    <Trophy className="icon-md" />
                                </div>
                                <div className="info-text">
                                    <span className="info-label">Format</span>
                                    <span className="info-value">{event.format}</span>
                                </div>
                            </div>

                            <div className="info-card">
                                <div className="info-icon">
                                    <MapPin />
                                </div>
                                <div className="info-text">
                                    <span className="info-label">district</span>
                                    <span className="info-value">{event.district}</span>
                                </div>
                            </div>

                        </div>

                        {/* Tournament Details Section */}
                        <div className="section-card">
                            <h2 className="section-title">Tournament Details</h2>
                            <div className="section-content">
                                <p className="detail-text">
                                    {event.description}
                                </p>
                                <div className="highlights">
                                    <h3 className="highlights-title">Tournament Highlights:</h3>
                                    <ul className="highlights-list">
                                        {event.highlights.map((item, index) => {
                                            return <li key={index}>{item}</li>
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Location Section */}
                        <div className="section-card">
                            <h2 className="section-title">
                                <MapPin className="icon-sm" />
                                Location
                            </h2>
                            <div className="section-content">
                                <div className="location-info">
                                    <h3 className="location-venue">{event.venueName}</h3>
                                    <div className="location-address">
                                        <p>{event.address}</p>
                                        <p>{event.district} District,</p>
                                        <p>{event.city}</p>
                                        <p>{event.zipCode}</p>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column - Contact & Registration */}
                    <div className="side-column">

                        {/* Entry Fee Card */}
                        <div className="price-card">
                            <div className="price-header">
                                <IndianRupee className="price-icon" />
                                <h3 className="price-title">Entry Fee</h3>
                            </div>
                            <div className="price-amount">
                                <span className="currency"><IndianRupee /></span>
                                <span className="amount">{event.entryFee}</span>
                                <span className="per-team">per team</span>
                            </div>
                        </div>

                        {/* Contact Details Card */}
                        <div className="contact-card">
                            <h3 className="contact-title">Contact Information</h3>

                            <div className="contact-item">
                                <div className="contact-icon">
                                    <Phone className="icon-xs" />
                                </div>
                                <div className="contact-text">
                                    <span className="contact-label">Phone 1</span>
                                    <a href="tel:+15551234567" className="contact-link">
                                        {event.phone1}
                                    </a>
                                </div>
                            </div>
                            <div className="contact-item">
                                <div className="contact-icon">
                                    <Phone className="icon-xs" />
                                </div>
                                <div className="contact-text">
                                    <span className="contact-label">Phone 2</span>
                                    <a href="tel:+15551234567" className="contact-link">
                                        {event.phone2 || '-'}
                                    </a>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="contact-icon">
                                    <Mail className="icon-xs" />
                                </div>
                                <div className="contact-text">
                                    <span className="contact-label">Email</span>
                                    <a href="mailto:info@nbc2024.com" className="contact-link">
                                        {event.email || '-'}
                                    </a>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="contact-icon">
                                    <Instagram className="icon-xs" />
                                </div>
                                <div className="contact-text">
                                    <span className="contact-label">Instagram</span>
                                    <a href={event.inatagramLink || null} target="_blank" rel="noopener noreferrer" className="contact-link">
                                        @ {event.instagram || '-'}

                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Awards Card */}
                        <div className="awards-card">
                            <div className="awards-header">
                                <Award className="icon-sm" />
                                <h3 className="awards-title">Prizes & Awards</h3>
                            </div>
                            <div className="awards-list">
                                <div className="award-item">
                                    <span className="award-place">1st Place</span>
                                    <span className="award-prize">
                                        &#8377;                                        {event.firstPrize ?? '-'}
                                    </span>
                                </div>
                                <div className="award-item">
                                    <span className="award-place">2nd Place</span>
                                    <span className="award-prize">
                                        &#8377;
                                        {event.secondPrize ?? '-'}</span>
                                </div>
                                <div className="award-item">
                                    <span className="award-place">3rd Place</span>
                                    <span className="award-prize">
                                        &#8377;
                                        {event.thirdPrize ?? '-'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {isUserLoggedIn && userData._id === event.hostedUser._id &&

                    (
                        <div className="event-page-edit-del">
                            <button
                                className="event-edit-btn"
                                onClick={() => navigate(`/event/edit/${event._id}`)}
                            >Edit
                                <svg className="svg" viewBox="0 0 512 512">
                                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg>
                            </button>

                            <button
                                className="event-edit-btn event-delete-btn"
                                onClick={() => deleteEvent(event._id)}
                            >
                                Delete
                                <MdDelete />
                            </button>

                        </div>
                    )}
            </div>

        </div>
    )
}
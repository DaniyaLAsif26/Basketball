import './view-event.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';

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

    const deleteEvent = () => {

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
                <div className="event-page-edit-del">
                    <button
                        className='event-edit-btn'
                        onClick={() => navigate(`/event/edit/${event._id}`)}>
                        Edit
                    </button>
                    <button
                        className='event-edit-btn event-delete-btn'
                        onClick={deleteEvent}
                    >Delete
                    </button>
                </div>
            </div>

        </div>
    )
}
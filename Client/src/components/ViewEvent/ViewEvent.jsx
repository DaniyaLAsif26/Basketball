import './view-event.css'
import { useNavigate } from 'react-router-dom'

import { FaBasketball } from "react-icons/fa6";

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

    const navigate = useNavigate()

    return (
        <div className="page-wrapper">

            {/* Header Section */}
            <div className="page-header">
                <button className="back-btn" onClick={() => navigate('/events')}>
                    <ArrowLeft className="icon-sm" />
                    Back to Events
                </button>
            </div>

            <div className="page-container">

                {/* Hero Image Section */}
                <div className="hero-section">
                    <img
                        src="https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&q=80"
                        alt="Basketball Tournament"
                        className="hero-img"
                    />
                    <div className="hero-overlay"></div>

                    <div className="hero-content">
                        <div className="hero-badges">
                            <span className="hero-badge type">COLLEGE</span>
                            <span className="hero-badge level">UN-OFFICIAL</span>
                        </div>
                        <h1 className="hero-title">National Basketball Championship 2024</h1>
                        <div className="hero-meta">
                            <div className="meta-item">
                                <Calendar className="icon-sm" />
                                <span>March 15-20, 2024</span>
                            </div>
                            <div className="meta-item">
                                <MapPin className="icon-sm" />
                                <span>Madison Square Garden, New York</span>
                            </div>
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
                                    <span className="info-value">MEN</span>
                                </div>
                            </div>

                            <div className="info-card">
                                <div className="info-icon">
                                    <Users className="icon-md" />
                                </div>
                                <div className="info-text">
                                    <span className="info-label">Age Category</span>
                                    <span className="info-value">OPEN</span>
                                </div>
                            </div>

                            <div className="info-card">
                                <div className="info-icon">
                                    <Trophy className="icon-md" />
                                </div>
                                <div className="info-text">
                                    <span className="info-label">Format</span>
                                    <span className="info-value">5X5</span>
                                </div>
                            </div>

                            <div className="info-card">
                                <div className="info-icon">
                                    <MapPin />
                                </div>
                                <div className="info-text">
                                    <span className="info-label">district</span>
                                    <span className="info-value">Kumuram Bheem Asifabad</span>
                                </div>
                            </div>

                        </div>

                        {/* Tournament Details Section */}
                        <div className="section-card">
                            <h2 className="section-title">Tournament Details</h2>
                            <div className="section-content">
                                <p className="detail-text">
                                    Join us for the most prestigious college basketball tournament of the year!
                                    The National Basketball Championship brings together the best college teams
                                    from across the country for an intense week of competition.
                                </p>
                                <div className="highlights">
                                    <h3 className="highlights-title">Tournament Highlights:</h3>
                                    <ul className="highlights-list">
                                        <li>Professional referees and scoring system</li>
                                        <li>Live streaming of all matches</li>
                                        <li>Prize money for top 3 teams</li>
                                        <li>Individual player awards (MVP, Top Scorer)</li>
                                        <li>Official tournament merchandise available</li>
                                        <li>Food and beverage stalls on-site</li>
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
                                    <h3 className="location-venue">Madison Square Garden</h3>
                                    <p className="location-address">
                                        4 Pennsylvania Plaza
                                        New York, NY 10001
                                        United States
                                    </p>
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
                                <span className="amount">2600</span>
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
                                        7382049545
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
                                        7659929021
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
                                        info@nbc2024.com
                                    </a>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="contact-icon">
                                    <Instagram className="icon-xs" />
                                </div>
                                <div className="contact-text">
                                    <span className="contact-label">Instagram</span>
                                    <a href="https://instagram.com/nbc2024" target="_blank" rel="noopener noreferrer" className="contact-link">
                                        @nbc2024
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
                                    <span className="award-prize">&#8377;2600</span>
                                </div>
                                <div className="award-item">
                                    <span className="award-place">2nd Place</span>
                                    <span className="award-prize">&#8377;1600</span>
                                </div>
                                <div className="award-item">
                                    <span className="award-place">3rd Place</span>
                                    <span className="award-prize">&#8377;1000</span>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}
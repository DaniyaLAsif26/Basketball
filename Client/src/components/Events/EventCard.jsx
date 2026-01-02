import './event-card.css'
import { useNavigate } from 'react-router-dom';

import { BiCategory } from "react-icons/bi";
import { GiAges } from "react-icons/gi";
import { FaBasketball } from "react-icons/fa6";
import { FaMapPin } from "react-icons/fa";

export default function EventCard({ event }) {

  const navigate = useNavigate()

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

  return (
    <div className="event-wrapper" >
      <div className="event-container">
        {/* Card */}
        <div className="event-card">

          {/* Image Section */}
          <div className="event-image">
            <img
              src={event.tournamentImage}
              // src="https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80"
              alt="Basketball Tournament"
              className="event-img"
            />

            {/* Gradient Overlay */}
            <div className="event-overlay"></div>

            {/* Type Badge */}
            <div className="type-badge">
              {event.level}
            </div>

            {/* Level Badge */}
            <div className="level-badge">
              {event.type}
            </div>
          </div>

          {/* Content Section */}
          <div className="event-content">

            {/* Tournament Name */}
            <div className="event-header">
              <h2 className="event-title">
                {event.tournamentName}
              </h2>
              <div className="event-date-details">
                <div className="event-date">
                  {/* <Calendar className="icon-sm" /> */}
                  <span>{formatedDate(event.startDate, event.endDate)}</span>
                </div>
                <div className="event-deadline">
                  {/* <Calendar className="icon-sm" /> */}
                  <span>Deadline : {new Date(event.registrationDeadline).toLocaleString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}</span>
                </div>
              </div>
            </div>

            {/* Event Details Grid */}
            <div className="event-details">

              <div className="detail-item">
                <div className="detail-icon">
                  <BiCategory />
                </div>
                <div className="detail-content">
                  <span className="detail-label">Category</span>
                  <span className="detail-value">{event.category}</span>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <GiAges />
                </div>
                <div className="detail-content">
                  <span className="detail-label">Age Category</span>
                  <span className="detail-value">{event.ageCategory}</span>
                  <span className="detail-value"></span>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <FaBasketball />
                </div>
                <div className="detail-content">
                  <span className="detail-label">Format</span>
                  <span className="detail-value">                  <span className="detail-value">{event.format}</span>
                  </span>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <FaMapPin />
                </div>
                <div className="detail-content">
                  <span className="detail-label">DISTRICT</span>
                  <span className="detail-value">{event.district}</span>
                  <span className="detail-value"></span>
                </div>
              </div>

            </div>

            {/* Action Button */}
            <div className="event-actions">
              <button className="btn-details" onClick={() => navigate('/view-event')}>
                View Details
              </button>
            </div>
          </div>

          {/* Bottom Accent Line */}
          <div className="event-accent"></div>
        </div>

        {/* Glow Effect */}
        <div className="event-glow"></div>
      </div>
    </div>
  )
}
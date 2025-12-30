import './event-card.css'
import { useNavigate } from 'react-router-dom';

import { BiCategory } from "react-icons/bi";
import { GiAges } from "react-icons/gi";
import { FaBasketball } from "react-icons/fa6";
import { FaMapPin } from "react-icons/fa";

export default function EventCard({event}) {

      const navigate = useNavigate()

  return (
    <div className="event-wrapper" >
      <div className="event-container">
        {/* Card */}
        <div className="event-card">

          {/* Image Section */}
          <div className="event-image">
            <img
              src={event.img}
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
              UN-OFFICIAL
            </div>
          </div>

          {/* Content Section */}
          <div className="event-content">

            {/* Tournament Name */}
            <div className="event-header">
              <h2 className="event-title">
                {event.name}
              </h2>
              <div className="event-date">
                {/* <Calendar className="icon-sm" /> */}
                <span>March 15-20, 2024</span>
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
                  <span className="detail-value">U-23</span>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <FaBasketball />
                </div>
                <div className="detail-content">
                  <span className="detail-label">Format</span>
                  <span className="detail-value">5X5</span>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <FaMapPin />
                </div>
                <div className="detail-content">
                  <span className="detail-label">DISTRICT</span>
                  <span className="detail-value">Bhadradri Kothagudem</span>
                </div>
              </div>

            </div>

            {/* Action Button */}
            <div className="event-actions">
              <button className="btn-details" onClick={()=> navigate('/view-event')}>
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
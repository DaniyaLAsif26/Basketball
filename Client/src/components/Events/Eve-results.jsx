import './events.css'
import { useNavigate } from 'react-router-dom';

export default function EveResults({ searchResults }) {

    const navigate = useNavigate()

    return (
        <div className="event-result-cont">
            <div className="event-results">
                {searchResults.map((item, index) =>
                    <div className="event-result" onClick={() => navigate('/view-event')}>
                        <div className="event-reult-img">
                            <img src={item.img} alt="" />
                        </div>
                        <div className="event-details">
                            <div className="event-type-btns">
                                <div class="categories">
                                    <span>Un-Official</span>
                                    <span>5X5</span>
                                    <span>MEN</span>
                                    <span>University</span>
                                    <span>Open-Age</span>
                                </div>
                            </div>

                            <div className="event-head">{item.name}</div>
                            <div className="event-date">20th October, 2025</div>
                            
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
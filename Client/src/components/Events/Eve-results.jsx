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
                            <div className="event-head">{item.name}</div>
                            <div className=""><b>Level :</b> {item.level}</div>
                            <div className=""><b>Format :</b> {item.format}</div>
                            <div className=""><b>Age :</b> {item.age}</div>
                            <div className=""><b>Category :</b> {item.category}</div>
                            <div className=""><b>Date :</b> 20/10/2004</div>
                        </div>
                    </div>
                )}
                <div className="add-evt-btn">
                    <div tabindex="0" class="plusButton" onClick={()=> navigate("/add-event")}>
                        <svg class="plusIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                            <g mask="url(#mask0_21_345)">
                                <path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z"></path>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}
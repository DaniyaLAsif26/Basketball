import './events.css'
import { useNavigate } from 'react-router-dom';
import { IoMdAdd } from "react-icons/io";

export default function EveResults({ searchResults }) {

    const navigate = useNavigate()

    return (
        <div className="event-result-cont">
            <div className="event-results">
                {searchResults.map((item, index) =>
                    <div className="event-result" onClick={()=> navigate('/view-event')}>
                        <img src={item.img} alt="" />
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
                    <a href="/add-event"><IoMdAdd style={{ fontSize: '2rem' }} /></a>
                </div>
            </div>
        </div>
    )
}
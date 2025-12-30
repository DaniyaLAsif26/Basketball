import './events.css'
import EventCard from './EventCard';

export default function EveResults({ searchResults }) {

    return (
        <div className="event-result-cont">
            <div className="event-results">
                {searchResults.map((item, index) =>
                    <EventCard event={item} />
                )}
            </div>
        </div>
    )
}
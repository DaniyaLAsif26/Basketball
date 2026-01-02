import './events.css'
import EventCard from './EventCard';

export default function EveResults({ searchResults }) {

    return (
        <div className="event-result-cont">
            <div className="event-results">
                {searchResults.length > 0 ? (
                    searchResults.map((item, index) =>
                        <EventCard key={index} event={item} />
                    )
                ) : (
                    <div className="event-error-msg">No Tournaments currently being hosted</div>
                )}
            </div>
        </div>
    )
}
import './events.css'
import EventCard from './EventCard';

import { useEffect, useState } from 'react';

export default function EveResults({ searchResults, loading }) {

    const [showResults, setShowResults] = useState(false)

    useEffect(() => {
        if (!loading) {
            const timer = setTimeout(() => {
                setShowResults(true)
            }, 1260)

            return () => clearTimeout(timer);
        }
        else {
            setShowResults(false);
        }

    }, [showResults, loading])

    return (
        <div className='event-result-cont'>
            {loading || !showResults ? (
                <div className="event-loader">
                    <div class="loader">
                        <div class="loader-square"></div>
                        <div class="loader-square"></div>
                        <div class="loader-square"></div>
                        <div class="loader-square"></div>
                        <div class="loader-square"></div>
                        <div class="loader-square"></div>
                        <div class="loader-square"></div>
                    </div>
                </div>
            ) : (
                <div className={`event-results ${!showResults && 'bg-blur'}`}>
                    {searchResults.length > 0 ? (
                        searchResults.map((item, index) =>
                            <EventCard key={index} event={item} />
                        )
                    ) : (
                        <div className="event-error-msg">
                            No Events Found
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
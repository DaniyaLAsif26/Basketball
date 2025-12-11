import './events.css'
import { FaSearch } from "react-icons/fa";

export default function EveSearch({search}) {
    return (
        <div className="evt-sort-wrapper evt-sort-wrapper-search" onClick={search}>
            <div className="evt-search">
                <FaSearch className="sort-icon" style={{ fontSize: '1.15rem' }} />
            </div>
        </div>
    )
}
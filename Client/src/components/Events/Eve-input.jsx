import './events.css'

export default function EveInput({ search, setSearch }) {
    return (
        <div className="evt-search">
            <input type="text" placeholder='Search Here' id='search-input' name='search' className='search' value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
    )
}
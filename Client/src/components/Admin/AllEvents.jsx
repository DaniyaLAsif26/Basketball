import './all-events.css'
import './all-users.css'
import OptionsHead from './OptionHead'
import { useState } from 'react'

export default function AllEvents({table}) {

    const [search, setSearch] = useState('')

        const OptHead = {
        heading: "All Events",
        placeholder: "Search Events",
        search: setSearch,
        btn: "Add Event",
        url: '/admin/add-event',
        // rankedOptions: { ranked: ranked, showRanked: setRanked }
    }

    return (
        <div className="all-events cont">
            <OptionsHead head={OptHead}/>
            <div className="all-users">
                <div className="all-users-table-cont">
                    <table className='all-users-table'>
                        <thead>
                            <tr>
                                {table.map((item, index) => (
                                    <th>{item}</th>
                                ))}
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody><tr><td></td></tr></tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
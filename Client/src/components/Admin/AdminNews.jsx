import './admin-news.css'
import './all-users.css'
import OptionsHead from './OptionHead'

import { useState } from 'react'

export default function AdminNews({ table }) {

    const [search, setSearch] = useState('')

    const OptHead = {
        heading: "All News",
        placeholder: "Search News",
        search: setSearch,
        btn: "Add news",
        url: '/admin/add-news',
    }

    return (
        <div className="admin-news-cont">
            <OptionsHead head={OptHead} />
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
import './all-users.css'
import { useState, useEffect } from 'react'
import OptionsHead from './OptionHead'

export default function AllUsers({ table }) {

    const [search, setSearch] = useState('')
    const [ranked, setRanked] = useState(false)

    useEffect(() => {
        console.log(ranked)
    }, [ranked])

    const OptHead = {
        heading: "All Users",
        placeholder: "Search Users",
        search: setSearch,
        btn: "Add User",
        url: '/admin/add-user',
        rankedOptions: { ranked: ranked, showRanked: setRanked }
    }
    return (
        <div className="all-users-cont">
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
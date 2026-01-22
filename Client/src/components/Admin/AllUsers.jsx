import './all-users.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import OptionsHead from './OptionHead'

const BackEndRoute = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function AllUsers({ table }) {

    const navigate = useNavigate()

    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([])
    const [ranked, setRanked] = useState(false)

    const OptHead = {
        heading: "All Users",
        placeholder: "Search Users",
        search: setSearch,
        btn: "Add User",
        url: '/admin/add-user',
        rankedOptions: { ranked: ranked, showRanked: setRanked }
    }

    const getAllUsers = async () => {
        try {
            const res = await fetch(`${BackEndRoute}/api/user/all-users`, {
                method: "GET",
                credentials: "include"
            })

            const dataRes = await res.json()

            if (dataRes.success === false) {
                alert(dataRes.message)
                setUsers([])
                return;
            }

            setUsers(dataRes.users)
            return;
        }
        catch (err) {
            console.log(err.message)
            setUsers([])
            alert(err.message)
        }
    }

    useEffect(() => {
        getAllUsers()
    }, [])

    const deleteUser = async () => {
        const isConfirmed = confirm("User will be Deleted")

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
                        <tbody>
                            {users.map((user, index) =>
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.email}</td>
                                    <td> <b>{user.ranking.currentRanking || '-'} </b></td>
                                    <td>
                                        <button onClick={() => navigate(`/admin/user/edit/${user._id}`)} className='edit-news-btn'>Edit</button>
                                    </td>
                                    <td>
                                        <button onClick={deleteUser} className='delete-news-btn'>Delete</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
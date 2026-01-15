import './admin-news.css'
import './all-users.css'
import OptionsHead from './OptionHead'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const BackEndRoute = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function AdminNews({ table }) {

    const navigate = useNavigate()

    const [search, setSearch] = useState('')
    const [news, setNews] = useState([])

    const OptHead = {
        heading: "All News",
        placeholder: "Search News",
        search: setSearch,
        btn: "Add news",
        url: '/admin/add-news',
    }

    useEffect(() => {
        const getAllNews = async () => {
            try {
                const res = await fetch(`${BackEndRoute}/api/news/all-news`)

                const dataRes = await res.json()

                if (dataRes.success === true) {
                    return setNews(dataRes.news)
                }

                alert(`Error: ${dataRes.message}`)
            }
            catch (err) {
                console.log(err)
                alert(`Something went wrong while fetching Events`)
            }
        }
        getAllNews()
    }, [])

    const deleteNews = async (id) => {
        try {

            const confirmDelete = confirm('Are you sure you want to delete this news item?')

            if (!confirmDelete) {
                return
            }

            const res = await fetch(`${BackEndRoute}/api/news/delete/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            })

            const dataRes = await res.json()

            if (dataRes.success === false) {
                return alert(`Error: ${dataRes.message}`)
            }

            alert(dataRes.message)
            setNews(prevNews => prevNews.filter(item => item._id !== id))
        }
        catch (err) {
            console.log(err)
        }
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
                                    <th key={index}>{item}</th>
                                ))}
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {news.map((item, index) => (
                                <tr key={index}>
                                    <td >{item.newsHeadline}</td>
                                    <td >
                                        {new Date(item.createdAt).toLocaleString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}</td>
                                    <td>
                                        <button className='edit-news-btn' onClick={() => navigate(`/admin/edit-news/${item._id}`)}>Edit</button>
                                    </td>
                                    <td>
                                        <button className='delete-news-btn' onClick={() => deleteNews(item._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}